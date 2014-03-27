class StaticPagesController < ApplicationController
	before_filter :twitter_connect, only: [:hose, :fetch]

	def home
	end

	def juicedup
		@loading = ""
		if !cookies.permanent[:identifier]
			newid = ('a'..'z').to_a.shuffle[0,8].join + Save.count.to_s
			cookies.permanent[:identifier] = newid
		end
		@id = cookies.permanent[:identifier]
	end

	def galactic
#		if cookies.permanent[:identifier]
#			save = Save.find_by_identifier(cookies.permanent[:identifier])
#			if save
#				@rebirths = save.rebirths
#				@credits = save.credits
#			end
#		end
	end

	def test
	end
	
	def exp
	end

	def hose
		@query = params[:q]
		@query ||= "#true"
		@rtype = params[:type]
		@rtype ||= "mixed"
		@results = @client.search(@query, :result_type => @rtype, :lang => "en") rescue return
		if @results.any?
			@oldest = @results.first.id
			@results.each do |r| 
				if (r.id < @oldest)
					@oldest = r.id
				end
			end
		end
	end

	def fetch
		# uses current query and filter, pulls from before max id and updates oldest
		if params[:q] && params[:type] && params[:oldest]
			@query = params[:q]
			@query ||= '#true'
			@rtype = params[:type]
			@rtype ||= 'mixed'
			@oldest = params[:oldest].to_i
			respond_to do |format|
				format.js do
					@results = @client.search(@query, :result_type => @rtype, :lang => "en", :max_id => (@oldest-1))
					if @results.any?
						@oldest = @results.first.id
						@results.each do |r| 
							if (r.id < @oldest)
								@oldest = r.id
							end
						end
					end
				end
			end
		end
	end

  def twitter_connect
		@client ||= Twitter::REST::Client.new do |config|
			# please don't mess
		  config.consumer_key        = "6BjPgljvKQWo0vn829GNwA"
		  config.consumer_secret     = "KIyJs8A0i74IkNNaeaUL7K2Nqxfg7y3EReHhMmCc"
		  config.access_token        = ""
		  config.access_token_secret = ""
		end
  end
	
end
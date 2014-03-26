class StaticPagesController < ApplicationController
	before_filter :twitter_connect, only: [:hose]

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
		if params[:q]
			query = params[:q]
		else
			query = "#deep"
		end
		@results = @client.search(query, :result_type => "recent", :lang => "en").take(12)
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
class StaticPagesController < ApplicationController

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
	
	def save
	  respond_to do |format|
	  	format.js do
	  		save = Save.find(cookies.permanent[:identifier])
	  		if save
	    		save.update_attributes(save_params)
	    	else
    			save = Save.new(save_params)
					if save.save
					else
					end
				end
			end
    end
	end

	def load
		respond_to do |format|
			format.js do
				id = params[:identifier]
				save = Save.find(id)
				if save
					cookies.permanent[:identifier] = id
					@loading = save.data
				else
					@loading = "-"
				end
			end
		end
	end

	private
	  def save_params
      params.permit(:identifier, :data, :hiddenname, :username)
    end
end

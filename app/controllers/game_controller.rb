class GameController < ApplicationController

	def save
	  respond_to do |format|
	  	format.js do
	  		save = Save.find_by_identifier(cookies.permanent[:identifier])
	  		if save
	    		if save.update_attributes(save_params)
	    			@saved = "Game saved."
	    		end
	    	else
    			save = Save.new(save_params)
					if save.save
						@saved = "Created new save."
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
				save = Save.find_by_identifier(id)
				if save
					cookies.permanent[:identifier] = id
					@loading = save.data
				else
					@loading = "-"
				end
			end
		end
	end

	def rebirth
		respond_to do |format|
			format.js do
				id = params[:identifier]
				save = Save.find_by_identifier(id)
				if save && params[:credits]
					save.update_attribute(:credits, save.credits + params[:credits].to_i)
					save.update_attribute(:rebirths, save.rebirths + 1)
					@info = (save.rebirths.ordinalize).to_s+"_"+save.credits.to_s
				end
			end
		end
	end

	def getRbCredits
		respond_to do |format|
			format.js do
				id = params[:identifier]
				save = Save.find_by_identifier(id)
				if save
					@info = (save.rebirths).to_s+"_"+save.credits.to_s
				end		
			end
		end
	end

	private
	  def save_params
      params.permit(:identifier, :data, :hiddenname, :username, :credits)
    end
end

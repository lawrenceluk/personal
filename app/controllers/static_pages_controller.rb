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

	def galactic
		if cookies.permanent[:identifier]
			save = Save.find_by_identifier(cookies.permanent[:identifier])
			if save
				@rebirths = save.rebirths
				@credits = save.credits
			end
		end
	end

	def test
	end
	
end
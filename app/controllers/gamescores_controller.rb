class GamescoresController < ApplicationController
	def index
		@gamescores = GameScore.all
      	respond_to do |format|
        	format.json{ render json: @gamescores}
      	end
	end

	def new
	end

	def edit
	end

	def create
	end

	

	def destroy
	end 
end

class GamescoresController < ApplicationController
	def index
		@gamescores = GameScore.all
      	respond_to do |format|
        	format.json{ render json: @gamescores}
      	end
	end

end
 
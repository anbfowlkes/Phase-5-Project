class TeamgamesController < ApplicationController

    
    
    
    
    
    def show
        data = TeamGame.all
        render json: data
    end

end

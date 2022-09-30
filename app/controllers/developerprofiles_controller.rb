class DeveloperprofilesController < ApplicationController

    def graphs
        render json: DeveloperProfile.all
    end

    def addgraph
        item = DeveloperProfile.create!(graph_params)
        render json: item
    end

    private

    def graph_params
        params.permit(:charttype, :xaxis, :yaxis)
    end

end

class DeveloperprofilesController < ApplicationController

    def graphs
        render json: DeveloperProfile.all
    end

    def addgraph
        item = DeveloperProfile.create!(graph_params)
        render json: item
    end



    def destroy
        item = DeveloperProfile.find_by!(id: params[:id])
        if item.destroy
            render json: item
        else
            render json: {error: item.errors.full_messages}, status: 422
        end
    end

    private

    def graph_params
        params.permit(:charttype, :xaxis, :yaxis)
    end


end

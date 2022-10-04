class Api::V1::UsersController < ApplicationController

    def profile
        token = request.headers['token']
        user_id = decoded_token(token)
        render json: User.find(user_id)
    end

    def create
        @user = User.create(user_params)
        if @user.valid?
            @token = encode_token(user_id: @user.id)
            render json: { user: UserSerializer.new(@user) }, status: :created
        else
            render json: { error: 'failed to create user' }, status: :unprocessable_entity
        end
    end

    def login
            user = User.find_by!(username:params[:username]).try(:authenticate, params[:password])
        if user
            token = generate_token(user.id)
            render json: {user:user, token:token}
        else
            render json: {error:"wrong login info"}, status: 401
        end
    end


    private
    def user_params
        params.require(:user).permit(:username, :password)
    end

end

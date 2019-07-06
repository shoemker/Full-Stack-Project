class Api::SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @user = User.find_by_credentials(
        params[:user][:username],
        params[:user][:password]
    )
		debugger
    if @user
      login(@user)
      render "api/users/show"
		else
      render json: ["Invalid username or password"], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user
      logout
      render "api/users/show"
		else

      render json: ["Logout failed"], status: 404
    end
  end
end

			# if params[:user][:password].length < 6 
			# 	render json: ["Password must be at least 6 chars"]
			# elsif @user.username.length == 0
			# 	render json: ["Username can't be blank"]	
			# else			
			# 	render json: ["Invalid Username or Password"], status: 401
			# end
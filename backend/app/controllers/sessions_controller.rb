class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    user = User.find_by(email: params[:email])
    if user && user.authenticated?(:password, params[:password])
      log_in user
      params[:remember_me] == '1' ? remember(user) : forget(user)
      respond_to do |format|
        format.json do render :json => {:status => true,
                                        :current_user => user.slice(:name, :surname, :id),
                                        :profile => (data user)} end
      end
    else
      respond_to do |format|
        format.json {render :json => {:status => false}}
      end
    end
  end

  def destroy
    log_out if logged?
    respond_to do |format|
      format.json
    end
  end
end

class MessagesController < ApplicationController
  skip_before_filter :verify_authenticity_token
  
  def index
    @messages = Message.where('CAST(receiver_id AS text) LIKE ?', current_user.id.to_s).order('id DESC')
    respond_to do |format|
      format.js
    end
  end

  def create
    @user = User.find_by(id: params[:user_id])
    current_user.messages.create(text: params[:message][:text], receiver_id: @user.id)
    respond_to do |format|
      format.js
    end
  end
end

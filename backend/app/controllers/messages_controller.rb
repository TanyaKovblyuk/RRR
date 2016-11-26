class MessagesController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    msgs = []
    Message.where('CAST(receiver_id AS text) LIKE ?', current_user.id.to_s).order('id DESC')
    .all.map do |msg|
      user = User.find_by(id: msg.user_id)
      msgs << {img: (get_avatar user),
               user: user.slice(:name, :surname, :id),
               message: msg}
    end
    respond_to do |format|
      format.json do render :json => {status: false, messages: msgs} end
    end
  end

  def create
    @user = User.find_by(id: params[:user_id])
    current_user.messages.create(text: params[:message][:text], receiver_id: @user.id)
    respond_to do |format|
      format.json do render :json => {status: true} end
    end
  end
end

class MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    msgs = []
    Message.where('CAST(receiver_id AS text) LIKE ?', current_user.id.to_s).order('id DESC')
    .all.each do |msg|
      user = User.find_by(id: msg.user_id)
      msgs << {img: get_avatar(user),
               user: user.slice(:name, :surname, :id),
               message: msg}
    end
    respond_to do |format|
      format.json {render :json => {status: false, messages: msgs}}
    end
  end

  def create
    current_user.messages.create(text: params[:message][:text],
                                 receiver_id: params[:user_id])
    respond_to do |format|
      format.json {render :json => {status: true}}
    end
  end
end

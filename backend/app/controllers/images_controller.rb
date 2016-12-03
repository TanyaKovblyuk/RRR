class ImagesController < ApplicationController
  before_action :logged_for_action
  skip_before_filter :verify_authenticity_token

  def index
    respond_to do |format|
      format.json do render :json => {status: true,
                                      images: (current_user.images.map {|img| '/be/'+img.image.avatar.url})} end
    end
  end

  def create
    current_user.images.create(avatar: true, image: params[:avatar])
    respond_to do |format|
      format.json do render :json => {avatar: (get_avatar current_user)} end
    end
  end
end

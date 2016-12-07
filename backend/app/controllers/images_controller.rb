class ImagesController < ApplicationController
  before_action :logged_for_action
  skip_before_action :verify_authenticity_token

  def index
    images = current_user.images.last(9).reverse.map {|img| '/be/'+img.image.url}
    respond_to do |format|
      format.json {render :json => {status: true, images: images}}
    end
  end

  def create
    current_user.images.create(avatar: true, image: params[:avatar])
    respond_to do |format|
      format.json {render :json => {avatar: get_avatar(current_user)}}
    end
  end
end

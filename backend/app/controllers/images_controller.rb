class ImagesController < ApplicationController
  before_action :logged_for_action

  def index
    respond_to do |format|
      format.json do render :json => {status: true,
                                      images: (current_user.images.map {|img| '/be/'+img.image.avatar.url})} end
    end
  end
end

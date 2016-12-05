class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    user = User.new(user_params)

    if user.save
      Image.create(user_id: user.id,
                   avatar: true,
                   image: File.open("#{Rails.root}/public/images/fallback/avatar.png"))
      log_in user
      UserMailer.account_activation(user).deliver_now
      respond_to do |format|
        format.json do render :json => {status: true,
                                        current_user: user.slice(:name, :surname, :id),
                                        profile: data(user)} end
      end
    else
      respond_to do |format|
        format.json {render :json => {status: false, errors: user.errors.full_messages}}
      end
    end
  end

  def show
    respond_to do |format|
      format.json {render :json => {status: true, data: data(User.find_by(id: params[:id]))}}
    end
  end

  def start
    respond_to do |format|
      if logged?
        format.json do
          render :json => {status: true,
                           current_user: current_user.slice(:name, :surname, :id)}
        end
      else
        format.json {render :json => {status: false}}
      end
    end
  end

  def rating
    item = Post.find_by(id: params[:post_id]) unless params[:post_id].nil?
    item = Comment.find_by(id: params[:comment_id]) unless params[:comment_id].nil?
    begin
      item.ratings.create(:user_id => item.user_id,
                          :estimator_id => current_user.id,
                          (params[:like]? :like : :dislike) => 1)
    rescue => error
      puts "Error: duplicate key"
    end
    respond_to do |format|
      format.json {render :json => {status: error.nil?, rating: search_rating(item)}}
    end
  end

  def update
    if User.new(validation_hash).valid?
      current_user.update_attribute(:name, params[:name])
      current_user.update_attribute(:surname, params[:surname])
    end
    respond_to do |format|
      format.json {render :json => current_user.slice(:name, :surname, :id)}
    end
  end

  def edit_pass
    current_user.authenticated?(:password, params[:old_password])
    current_user.update_attributes(:password => params[:password],
                                   :password_confirmation => params[:password_confirmation])
    respond_to do |format|
      format.json {render :json => current_user.slice(:name, :surname, :id)}
    end
  end

  def edit
    respond_to do |format|
      format.json {render :json => {current_user: current_user.slice(:name, :surname, :id)}}
    end
  end

  def account_activation
  end

  def password_reset
  end

  def search
    line = params[:line]
    search = []
    User.all.each do |user|
      search<<user if (line.include?user.name)||
                      (line.include?user.surname)||
                      (user.name.include?line)||
                      (user.surname.include?line)
    end
    friends = search.map {|friend| {user: friend.slice(:name, :surname, :id),
                                    avatar: get_avatar(friend)}}
    respond_to do |format|
      format.json {render :json => {status: true, friends: friends}}
    end
  end

  def friends
    user = User.find_by(id: (params[:id]||current_user.id))
    friends = confirmed_friends(user).map {|friend| {user: friend.slice(:name, :surname, :id),
                                                      avatar: get_avatar(friend)}}
    respond_to do |format|
      format.json {render :json => {status: true, friends: friends}}
    end
  end

  def followers
    user = User.find_by(id: (params[:id]||current_user.id))
    friends = likely_friends(user).map {|friend| {user: friend.slice(:name, :surname, :id),
                                                  avatar: get_avatar(friend)}}
    respond_to do |format|
      format.json {render :json => {status: true, friends: friends}}
    end
  end

  def create_friend
    user = User.find_by(id: (params[:id]||current_user.id))
    if current_user.friends.all.include?(user)
      FriendRelation.where('CAST(user_id AS text) LIKE ? AND
                            CAST(friend_id AS text) LIKE ?', current_user.id.to_s, user.id.to_s)
      .all[0].update_attribute(:confirmed, true)
    else
      relation = FriendRelation.create(user_id: params[:id], friend_id: current_user.id)
    end
    respond_to do |format|
      format.json {render :json => {is_friend: true}}
    end
  end

  def destroy_friend
    user = User.find_by(id: params[:id])
    relation = (FriendRelation.where('CAST(user_id AS text) LIKE ?', user.id.to_s)
                              .where('CAST(friend_id AS text) LIKE ?', current_user.id.to_s))
    unless relation.count==0
      relation.each{|record| record.delete}
    else
      relation = (FriendRelation.where('CAST(user_id AS text) LIKE ?', current_user.id.to_s)
                                .where('CAST(friend_id AS text) LIKE ?', user.id.to_s))
      relation.each{|record| record.delete}
    end
    respond_to do |format|
      format.json {render :json => {is_friend: false}}
    end
  end

  private
    def user_params
      params.permit(:name, :surname, :gender, :email, :password, :password_confirmation)
    end

    def validation_hash
      { :name => params[:name],
        :surname => params[:surname],
        :gender => 'male',
        :email => 'true_email@exemple.com',
        :password => 'Validpass1',
        :password_confirmation => 'Validpass1' }
    end
end

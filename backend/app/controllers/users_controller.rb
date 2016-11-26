class UsersController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def new
    if logged?
      @data = {id: current_user.id.to_s, data: data(current_user)} if logged?
    else
     @data = {id: '0', data: {current_user: User.new()}}
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      log_in @user
      UserMailer.account_activation(@user).deliver_now
      respond_to do |format|
        format.json do render :json => {status: true, user: @user} end
      end
    else
      respond_to do |format|
        format.json do render :json => {status: false, errors: @user.errors.full_messages} end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do render :json => {status: true, data: data(User.find_by(id: params[:id]))} end
    end
  end

  def edit
  end

  def update
    @user = current_user
    if User.new(validation_hash).valid?
      @user.update_attribute(:name, params[:name])
      @user.update_attribute(:surname, params[:surname])
    end
    respond_to do |format|
      format.json do render :json => {status: true, data: data(current_user)} end
    end
  end

  def edit_pass
    @user = current_user
    @user.authenticated?(:password, params[:old_password])
    @user.update_attributes(:password => params[:password],
                            :password_confirmation => params[:password_confirmation])
    respond_to do |format|
      format.json do render :json => {status: true, data: data(current_user)} end
    end
  end

  def account_activation
  end

  def password_reset
  end

  def search
    line = params[:user][:name]
    @search = []
    User.all.each do |user|
      @search<<user if (line.include?user.name)||
                      (line.include?user.surname)||
                      (user.name.include?line)||
                      (user.name.include?line)
    end
    respond_to do |format|
      format.js
    end
  end

  def friends
    user = User.find_by(id: (params[:id]||current_user.id))
    friends = (confirmed_friends user).map {|friend| {user: friend,
                                                  avatar: (get_avatar friend)}}
    respond_to do |format|
      format.json do render :json => {status: true, friends: friends} end
    end
  end

  def propose
    user = User.find_by(id: (params[:id]||current_user.id))
    friends = (likely_friends user).map {|friend| {user: friend,
                                                   avatar: (get_avatar friend)}}
    respond_to do |format|
      format.json do render :json => {status: true, friends: friends} end
    end
  end

  def create_friend
    user = User.find_by(id: (params[:id]||current_user.id))
    if current_user.friends.all.include?(user)
      FriendRelation.where('CAST(user_id AS text) LIKE ? AND
                            CAST(friend_id AS text) LIKE ?', current_user.id.to_s, user.id.to_s)
      .all[0].update_attribute(confirmed: true)
    else
      relation = FriendRelation.create(user_id: params[:id], friend_id: current_user.id)
    end
    respond_to do |format|
      format.json do render :json => {is_friend: true} end
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
      format.json do render :json => {is_friend: false} end
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

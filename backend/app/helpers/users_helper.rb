require 'uri'

module UsersHelper
  def get_avatar user
    user.images.order('id DESC').all.each {|img| return img.image.avatar.url if img.avatar}
    nil
  end

  def data(user)
    comments = response_comment user
    posts = Post.where('CAST(user_id AS text) LIKE ?', user.id.to_s).reverse.map do |post|
      {post: post,
       img: if !Image.find_by(post_id: post.id).nil?
              Image.find_by(post_id: post.id).image.post.url
            else ''
            end }
    end
    {:user => user,
     :avatar => (get_avatar user),
     :posts => posts,
     :comments => comments,
     :friends => (get_nine_friends user),
     :user_id => user.id,
     :current_id => current_user.id,
     :statistics => {:posts => user.posts.count,
                     :images => user.images.count,
                     :comments => user.comments.count,
                     :friends => user.friends.count}}
  end

  def posts user
    posts = user.posts.last(10+params[:post].to_i).reverse.map do |post|
      {post: post,
       img: if !Image.find_by(post_id: post.id).nil?
              Image.find_by(post_id: post.id).image.post.url
            else ''
            end }
    end
    comments = response_comment user
    respond_to do |format|
      format.json do render :json => {:status => true, :posts => posts, :comments => comments} end
    end
  end

  def build_comments comments
    comments.map do |comment|
      {user: User.find_by(id: comment.user_id),
       comment: comment,
       avatar: (get_avatar User.find_by(id: comment.user_id))}
    end
  end

  def response_comment user
    Post.where('CAST(user_id AS text) LIKE ?', user.id.to_s).last(10).reverse.map do |post|
      (build_comments post.comments)||[[]]
    end
  end

  def get_nine_friends user
    (user.all_friends.count < 10 ? user.all_friends : user.all_friends.limit(9)).map do |friend|
      {avatar: (get_avatar friend),
       user: friend}
    end
  end

  def is_friend? user
    current_user.all_friends.include?(user)
  end

  def date_format strtime
    strtime.strftime('%B %d, %H:%M:%S')
  end

  def post_comments post
    Comment.where('CAST(post_id AS text) LIKE ?', post.id.to_s)
  end

  def news
    friend_ids = current_user.friends.map {|men| men.id} + current_user.inverse_friends.map {|men| men.id}
    posts = Post.where('CAST(user_id AS INT) IN (?)', friend_ids).last(20)
    posts = posts.map {|post| {post: post,
                               src: (!Image.find_by(post_id: post.id).nil? ? Image.find_by(post_id: post.id).image.post.url : ''),
                               user_id: User.find_by(id: post.user_id).id,
                               user_name: User.find_by(id: post.user_id).name+' '+User.find_by(id: post.user_id).surname,
                               img: (get_avatar User.find_by(id: post.user.id))}}
    posts
  end

  def get_user msg
    user = User.find_by(id: msg.user_id)
  end
end

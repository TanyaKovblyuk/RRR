require 'uri'

module UsersHelper
  def get_avatar user
    user.images.order('id DESC').all.each {|img| return ('/be'+img.image.avatar.url) if img.avatar}
    nil
  end

  def get_all_avatar user
    all_avatar=[]
    user.images.order('id DESC').all.each {|img| all_avatar<<('/be'+img.image.avatar.url) if img.avatar}
    all_avatar
  end

  def search_rating item
    rating = {like: 0, dislike: 0}
    item.ratings.map{|record| record.like==1? rating[:like]+=1 : rating[:dislike]+=1}
    rating
  end

  def data(user)
    comments = response_comment user
    posts = Post.where('CAST(user_id AS text) LIKE ?', user.id.to_s).last(10).reverse.map do |post|
      {post: post,
       rating: (search_rating post),
       img: if !Image.find_by(post_id: post.id).nil?
              ('/be'+Image.find_by(post_id: post.id).image.post.url)
            else ''
            end }
    end
    {:user => user.slice(:name, :surname, :id),
     :avatar => (get_avatar user),
     :all_avatar => (get_all_avatar user),
     :posts => posts,
     :comments => comments,
     :is_friend => (current_user.inverse_friends.all.include?(user)),
     :friends => (get_nine_friends user),
     :statistics => {:posts => user.posts.count,
                     :images => user.images.count,
                     :comments => user.comments.count,
                     :friends => user.all_friends.count}}
  end

  def posts user
    posts_array = user.posts.last(10).reverse.map do |post|
      {post: post,
       rating: (search_rating post),
       img: if !Image.find_by(post_id: post.id).nil?
              ('/be'+Image.find_by(post_id: post.id).image.post.url)
            else ''
            end }
    end
    comments = response_comment user
    respond_to do |format|
      format.json do render :json => {:status => true, :posts => posts_array, :comments => comments} end
    end
  end

  def get_next_posts(user, n)
    posts_array = user.posts.last(10+n).reverse.map do |post|
      {post: post,
       rating: (search_rating post),
       img: if !Image.find_by(post_id: post.id).nil?
              ('/be'+Image.find_by(post_id: post.id).image.post.url)
            else ''
            end }
    end
    comments = response_comment user
    respond_to do |format|
      format.json do render :json => {:status => true, :posts => posts_array, :comments => comments} end
    end
  end

  def build_comments comments
    comments.map do |comment|
      {user: User.find_by(id: comment.user_id).slice(:name, :surname, :id),
       comment: comment,
       rating: (search_rating comment),
       avatar: (get_avatar User.find_by(id: comment.user_id))}
    end
  end

  def response_comment user
    Post.where('CAST(user_id AS text) LIKE ?', user.id.to_s).last(10).reverse.map do |post|
      (build_comments post.comments)||[[]]
    end
  end

  def get_nine_friends user
    friends = confirmed_friends user
    (friends.count < 10 ? friends : friends.limit(9)).map do |friend|
      {avatar: (get_avatar friend),
       user: friend.slice(:name, :surname, :id)}
    end
  end

  def confirmed_friends user
    ids = user.friends.where('CAST(confirmed AS text) LIKE ?', "true").map {|men| men.id} +
          user.inverse_friends.where('CAST(confirmed AS text) LIKE ?', "true").map {|men| men.id}
    User.where('CAST(id AS INT) IN (?)', ids)
  end

  def likely_friends user
    ids = user.friends.where('CAST(confirmed AS text) LIKE ?', "true").map {|men| men.id} +
          user.inverse_friends.where('CAST(confirmed AS text) LIKE ?', "false").map {|men| men.id}
    User.where('CAST(id AS INT) IN (?)', ids)
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

  def news n
    friend_ids = current_user.friends.map {|men| men.id} + current_user.inverse_friends.map {|men| men.id}
    posts = Post.where('CAST(user_id AS INT) IN (?)', friend_ids).last(10+n)
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

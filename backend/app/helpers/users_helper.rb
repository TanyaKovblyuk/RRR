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
    item.ratings.each{|record| record.like==1? rating[:like]+=1 : rating[:dislike]+=1}
    rating
  end

  def data user
    {:user => user.slice(:name, :surname, :id, :presence),
     :avatar => get_avatar(user),
     :all_avatar => get_all_avatar(user),
     :posts => response_posts(user),
     :comments => response_comment(user),
     :is_friend => is_friend?(user),
     :friends => get_nine_friends(user),
     :images => get_eight_images(user),
     :statistics => {:posts => user.posts.count,
                     :images => user.images.count,
                     :comments => user.comments.count,
                     :friends => confirmed_friends(user).count}}
  end

  def post_images post
    images = (Image.where('CAST(post_id AS text) LIKE ?', post.id.to_s)
              .map{|image| ('/be'+image.image.post.url)})
    images.count==0? [] : images
  end

  def response_posts(user, n=0)
    user.posts.last(10+n).reverse.map do |post|
      {post: post,
       rating: search_rating(post),
       utube: URI.extract(post.text)[0],
       img: post_images(post) }
    end
  end

  def build_comments comments
    comments.map do |comment|
      user = User.find_by(id: comment.user_id)
      {user: user.slice(:name, :surname, :id),
       comment: comment,
       rating: search_rating(comment),
       avatar: get_avatar(user)}
    end
  end

  def response_comment(user, n=0)
    Post.where('CAST(user_id AS text) LIKE ?', user.id.to_s).last(10+n).reverse.map do |post|
      build_comments(post.comments)||[[]]
    end
  end

  def get_nine_friends user
    friends = confirmed_friends user
    (friends.count < 10 ? friends : friends.limit(9)).map do |friend|
      {avatar: get_avatar(friend),
       user: friend.slice(:name, :surname, :id)}
    end
  end

  def get_eight_images user
    imgs = user.images
    (imgs.count < 8 ? imgs : imgs.last(8))
    .map {|img| ('/be'+img.image.preview.url)}
  end

  def confirmed_friends user
    ids = (FriendRelation.where('CAST(user_id AS text) LIKE ? AND
                                CAST(confirmed AS text) LIKE ?',
                                user.id.to_s, 'true')
           .map {|relation| relation.friend_id})
    User.where('CAST(id AS INT) IN (?)', ids)
  end

  def get_followers user
    ids = (FriendRelation.where('CAST(friend_id AS text) LIKE ? AND
                                CAST(confirmed AS text) LIKE ?',
                                user.id.to_s, 'false')
           .map {|relation| relation.user_id})
    User.where('CAST(id AS INT) IN (?)', ids)
  end

  def is_friend? user
    FriendRelation.where('CAST(user_id AS text) LIKE ? AND
                          CAST(friend_id AS text) LIKE ?',
                          current_user.id.to_s, user.id.to_s)
    .count==1
  end

  def date_format time
    time.strftime('%B %d, %H:%M:%S')
  end

  def post_comments post
    Comment.where('CAST(post_id AS text) LIKE ?', post.id.to_s)
  end

  def news n
    friend_ids = (FriendRelation.where('CAST(user_id AS text) LIKE ?',
                                        current_user.id.to_s)
                  .map {|relation| relation.friend_id})
    Post.where('CAST(user_id AS INT) IN (?)', friend_ids).last(10+n).reverse
    .map do |post|
      user = User.find_by(id: post.user_id)
      {post: post,
       src: post_images(post),
       user_id: user.id,
       user_name: user.name+' '+user.surname,
       img: get_avatar(user)}
    end
  end

  def get_user msg
    User.find_by(id: msg.user_id)
  end
end

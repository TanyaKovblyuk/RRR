def name
  ["Albert", "Bertram", "Gilbert", "Herbert", "Hubert", "Robert", "Christy", "Kit", "Kester"]
end

def surname
  ["Wilson", "Thompson", "Benson", "Johnson", "Harris", "Evans", "Simpson", "Willis", "Fox", "Davies"]
end

def post
  ["Aliquam scelerisque est eget condimentum eleifend. Nullam id velit gravida.",
   "Tincidunt eros nec, hendrerit nisi. Cras ac mauris erat." ,
   "Nunc velit ex, ultrices vel consectetur non, laoreet vel purus." ,
   "Quisque facilisis mauris mi, quis finibus eros aliquet a. Aenean non rutrum tellus.",
   "Nunc scelerisque, diam vel varius feugiat, tortor magna molestie nulla, eget viverra justo ex vitae risus." ,
   "Morbi sed elementum libero. Vestibulum quis fermentum lorem. Nulla sit amet metus leo." ,
   "Curabitur et convallis lacus, eu rhoncus urna. Proin tellus risus, lobortis id varius at, interdum vel massa.",
   "In tempus, metus pharetra pharetra vehicula, elit dui luctus metus, vitae congue risus ligula a ipsum. ",
   "Vestibulum lacinia tempor urna id porttitor. Etiam venenatis non tellus in mattis."]
end

10.times do |n|
  User.create(name: name[n-1], surname: surname[n-1], gender: 'male',
              email: "my_#{n}_own_email@exemple.com",
              password: "Truepass1", password_confirmation: "Truepass1")
end

User.all.each do |user|
  7.times {|n| user.posts.create(text: post.sample)}
  5.times {|n| user.images.create(image: File.open("#{Rails.root}/public/images/fallback/#{(0..9).to_a.sample}.jpg"))}
  user.images.create(image: File.open("#{Rails.root}/public/images/fallback/#{(0..9).to_a.sample}.jpg"), avatar: true)
  3.times {|n| user.posts.all.sample.images.create(user_id: user.id, image: File.open("#{Rails.root}/public/images/fallback/#{(0..9).to_a.sample}.jpg"))}
  4.times {|n| user.friend_relations.create(friend_id: (0..9).to_a.sample)}
end

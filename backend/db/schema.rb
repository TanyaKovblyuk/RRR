# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161110203016) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string   "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
    t.integer  "image_id"
    t.integer  "post_id"
    t.index ["image_id"], name: "index_comments_on_image_id", using: :btree
    t.index ["post_id"], name: "index_comments_on_post_id", using: :btree
    t.index ["user_id"], name: "index_comments_on_user_id", using: :btree
  end

  create_table "friend_relations", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "friend_id"
    t.boolean  "confirmed",  default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["friend_id"], name: "index_friend_relations_on_friend_id", using: :btree
    t.index ["user_id"], name: "index_friend_relations_on_user_id", using: :btree
  end

  create_table "images", force: :cascade do |t|
    t.string   "image"
    t.datetime "created_at"
    t.boolean  "avatar",     default: false
    t.integer  "user_id"
    t.integer  "post_id"
    t.integer  "comment_id"
    t.index ["comment_id"], name: "index_images_on_comment_id", using: :btree
    t.index ["post_id"], name: "index_images_on_post_id", using: :btree
    t.index ["user_id"], name: "index_images_on_user_id", using: :btree
  end

  create_table "messages", force: :cascade do |t|
    t.string   "text"
    t.integer  "user_id"
    t.integer  "receiver_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["receiver_id"], name: "index_messages_on_receiver_id", using: :btree
    t.index ["user_id"], name: "index_messages_on_user_id", using: :btree
  end

  create_table "posts", force: :cascade do |t|
    t.string   "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
    t.index ["user_id"], name: "index_posts_on_user_id", using: :btree
  end

  create_table "ratings", force: :cascade do |t|
    t.integer  "like"
    t.integer  "dislike"
    t.integer  "estimator_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "user_id"
    t.integer  "comment_id"
    t.integer  "image_id"
    t.integer  "post_id"
    t.index ["comment_id"], name: "index_ratings_on_comment_id", using: :btree
    t.index ["estimator_id", "user_id", "comment_id"], name: "index_ratings_on_estimator_id_and_user_id_and_comment_id", unique: true, using: :btree
    t.index ["estimator_id", "user_id", "image_id"], name: "index_ratings_on_estimator_id_and_user_id_and_image_id", unique: true, using: :btree
    t.index ["estimator_id", "user_id", "post_id"], name: "index_ratings_on_estimator_id_and_user_id_and_post_id", unique: true, using: :btree
    t.index ["estimator_id"], name: "index_ratings_on_estimator_id", using: :btree
    t.index ["image_id"], name: "index_ratings_on_image_id", using: :btree
    t.index ["post_id"], name: "index_ratings_on_post_id", using: :btree
    t.index ["user_id"], name: "index_ratings_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "surname"
    t.string   "gender"
    t.string   "email"
    t.string   "password_digest"
    t.string   "activation_digest"
    t.boolean  "activated",         default: false
    t.datetime "activated_at"
    t.string   "remember_digest"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
  end

  add_foreign_key "comments", "images"
  add_foreign_key "comments", "posts"
  add_foreign_key "comments", "users"
  add_foreign_key "images", "comments"
  add_foreign_key "images", "posts"
  add_foreign_key "images", "users"
  add_foreign_key "posts", "users"
  add_foreign_key "ratings", "comments"
  add_foreign_key "ratings", "images"
  add_foreign_key "ratings", "posts"
  add_foreign_key "ratings", "users"
end

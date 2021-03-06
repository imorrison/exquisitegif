# encoding: UTF-8
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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130501220310) do

  create_table "animations", :force => true do |t|
    t.integer  "owner_id",     :null => false
    t.string   "title",        :null => false
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.integer  "frames_count"
  end

  add_index "animations", ["owner_id"], :name => "index_animations_on_owner_id"
  add_index "animations", ["title"], :name => "index_animations_on_title"

  create_table "delayed_jobs", :force => true do |t|
    t.integer  "priority",   :default => 0
    t.integer  "attempts",   :default => 0
    t.text     "handler"
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  add_index "delayed_jobs", ["priority", "run_at"], :name => "delayed_jobs_priority"

  create_table "frames", :force => true do |t|
    t.integer  "user_id",      :null => false
    t.integer  "animation_id", :null => false
    t.text     "data_url",     :null => false
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  add_index "frames", ["animation_id"], :name => "index_frames_on_animation_id"
  add_index "frames", ["user_id"], :name => "index_frames_on_user_id"

  create_table "gif_containers", :force => true do |t|
    t.integer  "animation_id",              :null => false
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
    t.string   "animated_gif_file_name"
    t.string   "animated_gif_content_type"
    t.integer  "animated_gif_file_size"
    t.datetime "animated_gif_updated_at"
  end

  add_index "gif_containers", ["animation_id"], :name => "index_gif_containers_on_animation_id"

  create_table "invitations", :force => true do |t|
    t.integer  "animation_id",   :null => false
    t.string   "email"
    t.string   "twitter_handle"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  add_index "invitations", ["animation_id"], :name => "index_invitations_on_animation_id"
  add_index "invitations", ["email"], :name => "index_invitations_on_email"
  add_index "invitations", ["twitter_handle"], :name => "index_invitations_on_twitter_handle"

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "provider"
    t.string   "uid"
    t.string   "username"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end

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

ActiveRecord::Schema.define(version: 2018_12_04_000120) do

  create_table "artists", force: :cascade do |t|
    t.string "spotify_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "genres"
    t.string "popularity"
    t.string "name"
    t.boolean "liked"
  end

  create_table "artists_profiles", id: false, force: :cascade do |t|
    t.integer "artist_id", null: false
    t.integer "profile_id", null: false
  end

  create_table "profiles", force: :cascade do |t|
    t.string "spotify_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "profiles_tracks", id: false, force: :cascade do |t|
    t.integer "profile_id", null: false
    t.integer "track_id", null: false
  end

  create_table "tracks", force: :cascade do |t|
    t.string "spotify_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "danceability"
    t.float "acoustic"
    t.float "energy"
    t.float "valence"
    t.string "genres"
    t.boolean "liked"
  end

end

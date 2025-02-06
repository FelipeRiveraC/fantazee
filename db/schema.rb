# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2025_02_06_160524) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "draft_teams", id: :string, force: :cascade do |t|
    t.string "user_id", null: false
    t.string "name", null: false
    t.string "league", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "formation", default: "3-4-3"
    t.index ["user_id"], name: "index_draft_teams_on_user_id"
    t.check_constraint "formation::text = ANY (ARRAY['3-4-3'::character varying, '4-4-2'::character varying]::text[])", name: "valid_formation_check"
  end

  create_table "matches", id: :string, force: :cascade do |t|
    t.integer "api_id", null: false
    t.date "date", null: false
    t.string "league", null: false
    t.string "season", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["api_id"], name: "index_matches_on_api_id", unique: true
  end

  create_table "player_statistics", id: :string, force: :cascade do |t|
    t.string "player_id", null: false
    t.string "match_id", null: false
    t.integer "games_minutes"
    t.integer "games_number"
    t.string "games_position"
    t.string "games_rating"
    t.boolean "games_captain", default: false
    t.boolean "games_substitute", default: false
    t.integer "shots_total"
    t.integer "shots_on"
    t.integer "goals_total"
    t.integer "goals_conceded"
    t.integer "goals_assists"
    t.integer "goals_saves"
    t.integer "passes_total"
    t.integer "passes_key"
    t.string "passes_accuracy"
    t.integer "tackles_total"
    t.integer "tackles_blocks"
    t.integer "tackles_interceptions"
    t.integer "duels_total"
    t.integer "duels_won"
    t.integer "dribbles_attempts"
    t.integer "dribbles_success"
    t.integer "dribbles_past"
    t.integer "fouls_drawn"
    t.integer "fouls_committed"
    t.integer "cards_yellow"
    t.integer "cards_red"
    t.integer "penalty_won"
    t.integer "penalty_committed"
    t.integer "penalty_scored"
    t.integer "penalty_missed"
    t.integer "penalty_saved"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["match_id"], name: "index_player_statistics_on_match_id"
    t.index ["player_id"], name: "index_player_statistics_on_player_id"
  end

  create_table "players", id: :string, force: :cascade do |t|
    t.integer "api_id", null: false
    t.string "name", null: false
    t.string "photo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "firstname"
    t.string "lastname"
    t.integer "age"
    t.date "birth_date"
    t.string "birth_place"
    t.string "birth_country"
    t.string "nationality"
    t.string "height"
    t.string "weight"
    t.integer "number"
    t.string "position"
    t.index ["api_id"], name: "index_players_on_api_id", unique: true
  end

  create_table "players_draft_teams", id: :string, force: :cascade do |t|
    t.string "draft_team_id", null: false
    t.string "player_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["draft_team_id"], name: "index_players_draft_teams_on_draft_team_id"
    t.index ["player_id"], name: "index_players_draft_teams_on_player_id"
  end

  create_table "users", id: :string, force: :cascade do |t|
    t.string "name"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "draft_teams", "users"
  add_foreign_key "player_statistics", "matches"
  add_foreign_key "player_statistics", "players"
  add_foreign_key "players_draft_teams", "draft_teams"
  add_foreign_key "players_draft_teams", "players"
end

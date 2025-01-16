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

ActiveRecord::Schema[7.0].define(version: 2025_01_16_214247) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum "engagement_status", ["UNSTARTED", "ACTIVE", "COMPLETE"]

  create_table "draft_teams", id: :string, force: :cascade do |t|
    t.string "user_id", null: false
    t.string "name", null: false
    t.string "league", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_draft_teams_on_user_id"
  end

  create_table "engagements", force: :cascade do |t|
    t.string "name", null: false
    t.enum "status", default: "UNSTARTED", null: false, enum_type: "engagement_status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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

  create_table "travel_chat_messages", id: :string, force: :cascade do |t|
    t.string "travel_id", null: false
    t.string "sender_id", null: false
    t.text "content", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sender_id"], name: "index_travel_chat_messages_on_sender_id"
    t.index ["travel_id"], name: "index_travel_chat_messages_on_travel_id"
  end

  create_table "travel_evaluations", id: :string, force: :cascade do |t|
    t.string "user_id", null: false
    t.string "travel_id", null: false
    t.integer "rating", null: false
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["travel_id"], name: "index_travel_evaluations_on_travel_id"
    t.index ["user_id"], name: "index_travel_evaluations_on_user_id"
  end

  create_table "travel_requests", id: :string, force: :cascade do |t|
    t.string "user_id", null: false
    t.string "travel_id", null: false
    t.integer "status", default: 0
    t.text "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["travel_id"], name: "index_travel_requests_on_travel_id"
    t.index ["user_id"], name: "index_travel_requests_on_user_id"
  end

  create_table "travels", id: :string, force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "origin", comment: "Origin of the travel"
    t.string "destination", comment: "Destination of the travel"
    t.decimal "distance_km", precision: 10, scale: 2, comment: "Estimated distance in kilometers"
    t.datetime "start_date", precision: nil, comment: "Start date and time of the travel"
    t.datetime "end_date", precision: nil, comment: "End date and time of the travel"
    t.decimal "estimated_budget", precision: 15, scale: 2, comment: "Estimated budget for the travel"
    t.string "currency", comment: "Currency for the budget"
    t.integer "max_participants", comment: "Maximum number of participants"
    t.integer "current_participants", default: 0, comment: "Current number of participants"
    t.integer "travel_type", comment: "Type of travel (e.g., business, leisure)"
    t.text "notes", comment: "Additional notes about the travel"
    t.boolean "is_public", default: false, comment: "Indicates if the travel is public or private"
  end

  create_table "travels_users", id: :string, force: :cascade do |t|
    t.string "travel_id", null: false
    t.string "user_id", null: false
    t.integer "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["travel_id"], name: "index_travels_users_on_travel_id"
    t.index ["user_id"], name: "index_travels_users_on_user_id"
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
  add_foreign_key "travel_chat_messages", "travels"
  add_foreign_key "travel_chat_messages", "users", column: "sender_id"
  add_foreign_key "travel_evaluations", "travels"
  add_foreign_key "travel_evaluations", "users"
  add_foreign_key "travel_requests", "travels"
  add_foreign_key "travel_requests", "users"
  add_foreign_key "travels_users", "travels"
  add_foreign_key "travels_users", "users"
end

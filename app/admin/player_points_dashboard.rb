ActiveAdmin.register_page "Player Points Dashboard" do
  menu priority: 4, label: "Player Points"

  # Mapping between POINTS_MULTIPLIERS keys and model attribute names.
  POINTS_ATTRIBUTES = {
    GAMES_MINUTES:         :games_minutes,
    GAMES_RATING:          :games_rating,
    GAMES_CAPTAIN:         :games_captain,  # boolean field
    SHOTS_TOTAL:           :shots_total,
    SHOTS_ON:              :shots_on,
    GOALS_TOTAL:           :goals_total,
    GOALS_ASSISTS:         :goals_assists,
    GOALS_SAVES:           :goals_saves,
    GOALS_CONCEDED:        :goals_conceded,
    PASSES_TOTAL:          :passes_total,
    PASSES_KEY:            :passes_key,
    PASSES_ACCURACY:       :passes_accuracy,
    TACKLES_TOTAL:         :tackles_total,
    TACKLES_BLOCKS:        :tackles_blocks,
    TACKLES_INTERCEPTIONS: :tackles_interceptions,
    DUELS_TOTAL:           :duels_total,
    DUELS_WON:             :duels_won,
    DRIBBLES_SUCCESS:      :dribbles_success,
    DRIBBLES_PAST:         :dribbles_past,
    FOULS_DRAWN:           :fouls_drawn,
    FOULS_COMMITTED:       :fouls_committed,
    CARDS_YELLOW:          :cards_yellow,
    CARDS_RED:             :cards_red,
    PENALTY_WON:           :penalty_won,
    PENALTY_COMMITTED:     :penalty_committed,
    PENALTY_SCORED:        :penalty_scored,
    PENALTY_MISSED:        :penalty_missed,
    PENALTY_SAVED:         :penalty_saved
  }.freeze

  sidebar "Filters", priority: 0 do
    form method: :get do
      # --- Filter by Match ---
      div do
        label "Match:"
        select name: "match_id" do
          option "", value: ""
          Match.all.each do |m|
            # Since Match doesn't have a name, combine attributes.
            display_label = "#{m.league} - #{m.season} - #{m.date}"
            option display_label, value: m.id, selected: (params[:match_id].to_s == m.id.to_s)
          end
        end
      end

      # --- Hide Columns ---
      div style: "margin-top:1em;" do
        label "Hide Stat Columns:"
        PlayerStatistic::POINTS_MULTIPLIERS.keys.each do |key|
          div do
            input type: "checkbox",
                  name: "hide_columns[]",
                  value: key.to_s,
                  checked: (params[:hide_columns] && params[:hide_columns].include?(key.to_s))
            span " #{key.to_s.titleize}"
          end
        end
      end

      # --- Sorting Filters ---
      div style: "margin-top:1em;" do
        label "Sort By:"
        select name: "sort_by" do
          # Basic columns.
          option "Created At", value: "created_at", selected: (params[:sort_by].to_s == "created_at")
          option "Player ID", value: "player_id", selected: (params[:sort_by].to_s == "player_id")
          option "Match ID", value: "match_id", selected: (params[:sort_by].to_s == "match_id")
          # Stat attributes.
          POINTS_ATTRIBUTES.each do |multiplier_key, attribute|
            option attribute.to_s.titleize,
                   value: attribute,
                   selected: (params[:sort_by].to_s == attribute.to_s)
          end
          # Also allow sorting by total points.
          option "Total Points", value: "total_points", selected: (params[:sort_by].to_s == "total_points")
        end
      end

      div style: "margin-top:1em;" do
        label "Sort Order:"
        select name: "sort_order" do
          option "Ascending", value: "asc", selected: (params[:sort_order].to_s == "asc")
          option "Descending", value: "desc", selected: (params[:sort_order].to_s == "desc")
        end
      end

      div style: "margin-top:1em;" do
        input type: "submit", value: "Filter"
      end
    end
  end

  content title: "Player Points Details" do
    # Start with the base query.
    player_stats = PlayerStatistic.includes(:player, :match)
    
    # Apply match filter if provided.
    if params[:match_id].present?
      player_stats = player_stats.where(match_id: params[:match_id])
    end

    # Sorting parameters.
    sort_by = params[:sort_by].presence || "created_at"
    sort_order = params[:sort_order].presence || "desc"

    allowed_sort_columns = %w[
      created_at player_id match_id games_minutes games_rating games_captain
      shots_total shots_on goals_total goals_assists goals_saves goals_conceded
      passes_total passes_key passes_accuracy tackles_total tackles_blocks
      tackles_interceptions duels_total duels_won dribbles_success dribbles_past
      fouls_drawn fouls_committed cards_yellow cards_red penalty_won penalty_committed
      penalty_scored penalty_missed penalty_saved total_points
    ]
    sort_by = "created_at" unless allowed_sort_columns.include?(sort_by)
    sort_order = %w[asc desc].include?(sort_order) ? sort_order : "desc"

    if sort_by == "total_points"
      # Use Ruby logic to sort by calculated total points.
      player_stats = player_stats.to_a.sort_by { |stat| stat.calculate_points }
      player_stats.reverse! if sort_order == "desc"
    else
      player_stats = player_stats.order("#{sort_by} #{sort_order}")
    end

    panel "Player Points Overview" do
      table_for player_stats do
        # Sortable columns for Player and Match.
        column "Player", sortable: "player_id" do |stat|
          stat.player
        end
        column "Match", sortable: "match_id" do |stat|
          "#{stat.match.league} - #{stat.match.season} - #{stat.match.date}"
        end

        hide_columns = params[:hide_columns] || []
        POINTS_ATTRIBUTES.each do |multiplier_key, attribute|
          next if hide_columns.include?(multiplier_key.to_s)
          multiplier = PlayerStatistic::POINTS_MULTIPLIERS[multiplier_key]
          column "#{attribute.to_s.titleize} (x#{multiplier})", sortable: attribute do |stat|
            value = stat[attribute]
            numeric_value =
              if value.is_a?(TrueClass) || value.is_a?(FalseClass)
                value ? 1.0 : 0.0
              elsif value.present?
                value.to_f
              else
                0.0
              end
            numeric_value * multiplier
          end
        end

        column "Total Points", sortable: "total_points" do |stat|
          stat.calculate_points.to_f.round(2)
        end
      end
    end
  end

  controller do
    def index
      # Filtering, sorting, and column logic is handled in the content block.
    end
  end
end

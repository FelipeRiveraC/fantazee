ActiveAdmin.register PlayerStatistic do
  permit_params :player_id, :match_id, :games_minutes, :games_rating, :goals_total, 
                :goals_assists, :goals_saves, :passes_total, :passes_accuracy

  index do
    selectable_column
    id_column
    column :player
    column :match
    column :games_minutes
    column :games_rating
    column :goals_total
    column :goals_assists
    column :goals_saves
    column :passes_total
    column :passes_accuracy
    column :created_at
    actions
  end

  filter :player
  filter :match
  filter :games_minutes
  filter :games_rating
  filter :goals_total
  filter :goals_assists
  filter :goals_saves
  filter :created_at

  form do |f|
    f.inputs do
      f.input :player
      f.input :match
      f.input :games_minutes
      f.input :games_rating
      f.input :goals_total
      f.input :goals_assists
      f.input :goals_saves
      f.input :passes_total
      f.input :passes_accuracy
    end
    f.actions
  end
end 
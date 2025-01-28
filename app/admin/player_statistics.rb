ActiveAdmin.register PlayerStatistic do
  permit_params :player_id, :week, :year, :points, :rebounds, :assists

  index do
    selectable_column
    id_column
    column :player
    column :week
    column :year
    column :points
    column :rebounds
    column :assists
    column :created_at
    actions
  end

  filter :player
  filter :week
  filter :year
  filter :points
  filter :rebounds
  filter :assists
  filter :created_at

  form do |f|
    f.inputs do
      f.input :player
      f.input :week
      f.input :year
      f.input :points
      f.input :rebounds
      f.input :assists
    end
    f.actions
  end
end 
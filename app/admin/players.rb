ActiveAdmin.register Player do
  permit_params :name, :api_id, :photo, :firstname, :lastname, :position, :number

  index do
    selectable_column
    id_column
    column :name
    column :firstname
    column :lastname
    column :position
    column :number
    column :nationality
    column "Draft Teams" do |player|
      player.draft_teams.count
    end
    column :created_at
    actions
  end

  show do
    attributes_table do
      row :id
      row :name
      row :firstname
      row :lastname
      row :position
      row :number
      row :nationality
      row :age
      row :height
      row :weight
      row :created_at
      row :updated_at
    end

    panel "Player's Draft Teams" do
      table_for player.draft_teams do
        column :name
        column :league
        column "Owner" do |team|
          link_to team.user.name, admin_user_path(team.user)
        end
        column :created_at
      end
    end

    panel "Statistics Summary" do
      attributes_table_for player do
        row "Total Matches" do |p|
          p.player_statistics.count
        end
        row "Total Goals" do |p|
          p.player_statistics.sum(:goals_total)
        end
        row "Total Assists" do |p|
          p.player_statistics.sum(:goals_assists)
        end
      end
    end
  end

  filter :name
  filter :firstname
  filter :lastname
  filter :position, as: :select, collection: Player::POSITIONS
  filter :nationality
  filter :draft_teams_name, as: :string, label: 'Draft Team Name'
  filter :created_at

  form do |f|
    f.inputs do
      f.input :name
      f.input :api_id
      f.input :photo
      f.input :firstname
      f.input :lastname
      f.input :position, as: :select, collection: Player::POSITIONS
      f.input :number
    end
    f.actions
  end

  sidebar "Draft Team Details", only: :show do
    attributes_table_for player do
      row "Total Draft Teams" do |p|
        p.draft_teams.count
      end
      row "Leagues" do |p|
        p.draft_teams.pluck(:league).uniq.join(", ")
      end
    end
  end
end 
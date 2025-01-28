ActiveAdmin.register DraftTeam do
  permit_params :name, :league, :user_id

  index do
    selectable_column
    id_column
    column :name
    column :league
    column "Owner" do |team|
      link_to team.user.name, admin_user_path(team.user)
    end
    column "Players" do |team|
      team.players.count
    end
    column :created_at
    actions
  end

  show do
    attributes_table do
      row :id
      row :name
      row :league
      row "Owner" do |team|
        link_to team.user.name, admin_user_path(team.user)
      end
      row :created_at
      row :updated_at
    end

    panel "Team Players" do
      table_for draft_team.players do
        column :name
        column :position
        column :number
        column :nationality
      end
    end
  end

  filter :name
  filter :league
  filter :user_name, as: :string, label: 'Owner Name'
  filter :players_name, as: :string, label: 'Player Name'
  filter :created_at

  form do |f|
    f.inputs do
      f.input :name
      f.input :league
      f.input :user
    end
    f.actions
  end

  sidebar "Team Details", only: :show do
    attributes_table_for draft_team do
      row "Total Players" do |team|
        team.players.count
      end
      row "Players by Position" do |team|
        team.players.group(:position).count.map { |pos, count| "#{pos}: #{count}" }.join(", ")
      end
    end
  end
end 
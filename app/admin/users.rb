ActiveAdmin.register User do
  menu priority: 2

  permit_params :name, :email

  index do
    selectable_column
    id_column
    column :name
    column :email
    column "Draft Teams" do |user|
      user.draft_teams.count
    end
    column :created_at
    actions
  end

  show do
    attributes_table do
      row :id
      row :name
      row :email
      row :created_at
      row :updated_at
      row :sign_in_count
      row :current_sign_in_at
      row :last_sign_in_at
    end

    panel "User's Draft Teams" do
      table_for user.draft_teams do
        column :name do |team|
          link_to team.name, admin_draft_team_path(team)
        end
        column :league
        column "Players" do |team|
          team.players.count
        end
        column :created_at
        column :actions do |team|
          links = []
          links << link_to("View", admin_draft_team_path(team), class: "member_link")
          links << link_to("Edit", edit_admin_draft_team_path(team), class: "member_link")
          links.join(' ').html_safe
        end
      end
    end
  end

  filter :name
  filter :email
  filter :created_at
  filter :draft_teams_name, as: :string, label: 'Draft Team Name'

  form do |f|
    f.inputs do
      f.input :name
      f.input :email
    end
    f.actions
  end

  sidebar "User Details", only: :show do
    attributes_table do
      row "Total Draft Teams" do |user|
        user.draft_teams.count
      end
      row "Total Players" do |user|
        user.draft_teams.joins(:players).count
      end
    end
  end
end 
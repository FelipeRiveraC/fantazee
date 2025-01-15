class CreateTravelChatMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :travel_chat_messages, id: :string do |t|
      t.string :travel_id, null: false
      t.string :sender_id, null: false
      t.text :content, null: false

      t.timestamps
    end

    add_foreign_key :travel_chat_messages, :travels, column: :travel_id
    add_foreign_key :travel_chat_messages, :users, column: :sender_id
    add_index :travel_chat_messages, :travel_id
    add_index :travel_chat_messages, :sender_id
  end
end

class CreateTeamGames < ActiveRecord::Migration[7.0]
  def change
    create_table :team_games do |t|
      t.string :team
      t.integer :week
      t.json :info

      t.timestamps
    end
  end
end

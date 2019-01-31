# README

# DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_name|string|index:true, null:false,unique:true|
|mail|string|null:false|
|password|string|null:false|

### Association
- has_many :groups,through: members
- has_many :messages
- has_many :members

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null:false|
### Association
- has_many :users,through: members
- has_many :messages
- has_many :members

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|reference|null: false, foreign_key: true|
|user_id|reference|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

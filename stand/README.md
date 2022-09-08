# Database structure

[<-Home](../README.md)

## Contents
[core-service](#core)<br>
[auth-service](#auth)<br>
[chat-service](#chat)<br>
[general](#general)<br>

<a id="core"/>

# Core-service

```plantuml
@startuml
' hide the spot
hide circle

' avoid problems with angled crows feet
skinparam linetype ortho

entity "Student" as stud {
  *id : uid
  --
  *name : string
  *school_id: uid <<FK>>
  *surname : string
}

entity "Speaker" as speaker {
  *id : uid
  --
  *name : string
  *surname : string
  *country_id : string <<FK>> default(null)
  avatar: string
  video: string
}

entity "School" as school {
  *id : uid <<generated>>
  --
  *name : string
  *school_id: uid <<FK>>
  avatar: string
}


entity "Language" as lang {
  *id : string
  --
  *name : string
}

entity "Country" as country {
  *id : string
  --
  *name : string
}

entity "AdditionalSpeakerLanguage" as speaker_lang {
  *id : number <<generated>>
  --
  *language_id : string <<FK>>
  *speaker_id: uid <<FK>>
}

entity "WorkingTime" as working_time {
  *id : number <<generated>>
  --
  *speaker_id: uid <<FK>>
  *starts_at: timestamp
  *end_at: timestamp
}

entity "LessonRequest" as lesson_request {
  *id : number <<generated>>
  --
  *speaker_id: uid <<FK>>
  *school_id: uid <<FK>>
  *supposedly_lesson_starts_at: timestamp
  *stage: string
}

entity "Lesson" as lesson {
  *id : number <<generated>>
  --
  *speaker_id: uid <<FK>>
  *school_id: uid <<FK>>
  *lesson_request_id: number <<FK>>
  *starts_at: timestamp
  *stage: string
}


speaker |o--|{ speaker_lang
country |o--|{ speaker
lesson  |o--o| lesson_request
lesson  }|--o| speaker
lesson  }|--o| school
speaker |o--|{ lesson_request
school  |o--|{ lesson_request
school  |o--|{ stud
lang    |o--|{ speaker_lang
speaker |o--|{ working_time
@enduml
```
![core-service](core.png)

<a id="auth"/>

## Auth-service

```plantuml
@startuml
' hide the spot
hide circle

' avoid problems with angled crows feet
skinparam linetype ortho

entity "User" as user {
  *id : uid
  --
  *login : string
  *password: string
}

entity "Role" as role {
  *id : string
  --
  *name : string
}

user    }o--o{ role
@enduml
```
![auth-service](auth.png)

<a id="chat"/>

## Chat-service

```plantuml
@startuml
' hide the spot
hide circle

' avoid problems with angled crows feet
skinparam linetype ortho

entity "User" as user {
  *id : uid
  --
  *login : string
  *password: string
}

entity "Role" as role {
  *id : string
  --
  *name : string
}

user    }o--o{ role
@enduml
```
![chat-service](chat.png)


<a id="general"/>

## General

```plantuml
@startuml
' hide the spot
hide circle

' avoid problems with angled crows feet
skinparam linetype ortho

entity "Student" as stud {
  *id : uid
  --
  *name : string
  *school_id: uid <<FK>>
  *surname : string
}

entity "Speaker" as speaker {
  *id : uid
  --
  *name : string
  *surname : string
  *country_id : string <<FK>> default(null)
  avatar: string
  video: string
}

entity "School" as school {
  *id : uid <<generated>>
  --
  *name : string
  *school_id: uid <<FK>>
  avatar: string
}


entity "Language" as lang {
  *id : string
  --
  *name : string
}

entity "Country" as country {
  *id : string
  --
  *name : string
}

entity "AdditionalSpeakerLanguage" as speaker_lang {
  *id : number <<generated>>
  --
  *language_id : string <<FK>>
  *speaker_id: uid <<FK>>
}

entity "WorkingTime" as working_time {
  *id : number <<generated>>
  --
  *speaker_id: uid <<FK>>
  *starts_at: timestamp
  *end_at: timestamp
}

entity "LessonRequest" as lesson_request {
  *id : number <<generated>>
  --
  *speaker_id: uid <<FK>>
  *school_id: uid <<FK>>
  *supposedly_lesson_starts_at: timestamp
  *stage: string
}

entity "Lesson" as lesson {
  *id : number <<generated>>
  --
  *speaker_id: uid <<FK>>
  *school_id: uid <<FK>>
  *lesson_request_id: number <<FK>>
  *starts_at: timestamp
  *stage: string
}

entity "Message" as message {
  *id : number <<generated>>
  --
  *text: text
  *sender_type: string
  *sender_id: uid <<FK>>
  *chat_type: string
  *chat_id: uid <<FK>>
  *sent_at: timestamp
}

entity "User" as user {
  *id : uid
  --
  *login : string
  *password: string
}

entity "Role" as role {
  *id : string
  --
  *name : string
}

entity "User" as chat_user {
  *id : uid
  --
  *name : string
}

entity "Chat" as chat {
  *id : uid <<generated>>
  --
  *name
}


chat_user }o--|{ chat
user    }o--o{ role
message }|--o| chat_user
message }|--o| chat
speaker |o--|{ speaker_lang
country |o--|{ speaker
lesson  |o--o| lesson_request
lesson  }|--o| speaker
lesson  }|--o| school
speaker |o--|{ lesson_request
school  |o--|{ lesson_request
school  |o--|{ stud
lang    |o--|{ speaker_lang
speaker |o--|{ working_time
@enduml
```
![general](general.png)
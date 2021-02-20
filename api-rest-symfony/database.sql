create database if not exists api_rest_symfony;
use api_rest_symfony;

create table users(
    id              int(255) auto_increment not null,
    name            varchar(255) not null,
    surname         varchar(255),
    email           varchar(255) not null,
    password        varchar(255) not null,
    role            varchar(20),
    created_at      datetime DEFAULT current_timestamp,
    constraint pk_users Primary key(id)
) ENGINE=InnoDb;

create table videos(
    id              int(255) auto_increment not null,
    user_id         int(255) not null,
    title           varchar(255) not null,
    description     text,
    url             varchar(255) not null,
    status          varchar(50),
    created_at      datetime DEFAULT current_timestamp,
    updated_at      datetime DEFAULT current_timestamp,
    constraint pk_videos Primary key(id),
    constraint fk_video_user foreign key(user_id) references users(id)
) ENGINE=InnoDb;
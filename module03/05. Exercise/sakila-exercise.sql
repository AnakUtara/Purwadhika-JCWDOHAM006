-- exercise yg pake world_db di skip aja. Ga ada port postgres-nya.

-- ini semua pake sakila ya, pake yg udah ada aja.

select c.country_id, c.country  from country c where c.country in ('China', 'Bangladesh', 'India'); 

-- ilike untuk search yang sifatnya case insensitive
-- % adalah placeholder yang membaca 1 atau lebih character apapun sebagai true
-- di contoh ini jika nama belakangnya WOODY. WO di depan dan Y di belakang akan dibaca oleh % sebagai ada karakter yang menghimpit OD
-- search OD diantara karakter tersebut.
select a.actor_id, a.first_name, a.last_name from actor a where a.last_name ilike '%od%' order by a.first_name, a.last_name;

alter table actor add column if not exists middle_name varchar(100);

select count(*) last_name_count, a.last_name from actor a group by a.last_name having count(*) >= 2;  

select s.first_name, s.last_name, a.address from staff s join address a on a.address_id = s.address_id;

select count(f.title ) copies, f.title from inventory i join film f on i.film_id = f.film_id group by f.title having f.title ilike 'Hunchback Impossible';

select count(r.rental_id) rental_count, f.title from rental r join inventory i on r.inventory_id = i.inventory_id join film f on i.film_id = f.film_id group by f.film_id, f.title order by count(r.rental_id) desc;

select s.store_id, c.city, c2.country from store s join address a on s.address_id = a.address_id join city c on a.city_id = c.city_id join country c2 on c.country_id = c2.country_id;

-- ini soalnya sebenarnya agak maksa pake join biasa juga bisa.

select first_name, last_name
from actor
where actor_id in (
    select actor_id 
    from film_actor 
    where film_id = (select film_id from film where title = 'ALONE TRIP')
);

alter table actor drop column if exists middle_name; 
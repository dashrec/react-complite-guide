import { PAGE_SIZE } from '../utils/constants';
import { getToday } from '../utils/helpers';
import supabase from './supabase';

// regular functions therefore we can not use useSearchParams hook in this function
export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName,email)',
      { count: 'exact' }
    ); // it will fetch related cabins and guests as well bookings based on foreign keys in bookings table

  // FILTER
  if (filter) query = query[filter.method || 'eq'](filter.field, filter.value); // we basically pass status, unconfirmed | checked-in | checked-out

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });

  // page will be url value of page
  if (page) {
    const from = (page - 1) * PAGE_SIZE;

    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to); // 0 - 9 would fetch exactly 10 raw and thats how range function of supabase works
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }
  return { data, count };
}
// get * about booking + cabins + guests foreign tables
export async function getBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date ISOString
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date) // getting all bookings after this date
    .lte('created_at', getToday({ end: true })); //and before this date

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Returns all STAYS that were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName)') // get guests and fullName as well
    .gte('startDate', date) // when booking starts to this date we pass
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      // supabase function which will fetch data in accordance with this conditional query
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data; // this data is returned from the mutation function which will than become data on onSuccess handler inside useChecking hook
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}

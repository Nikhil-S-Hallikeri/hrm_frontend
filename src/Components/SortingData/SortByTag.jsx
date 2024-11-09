import axios from 'axios';
import { useState } from 'react';
import { port } from '../../App';

function SortByTag({ Empid, setAllEmployeelist, tag, tagID }) {
  const [sortByAsc, setSortByAsc] = useState(false);

  const fetchSortedData = (sortBy, order) => {
    axios
      .get(`${port}root/ems/EmployeesSort/${Empid}?${order}=${sortBy}`)
      .then(res => {
        console.log(
          'SORTEDDATA',
          `${port}root/ems/EmployeesSort/${Empid}?${order}=${tagID}`,
        );
        console.log('SORTEDDATA', res);
        setAllEmployeelist(res.data);
      })
      .catch(err => {
        console.log('AllEmployee_err', err);
      });
  };
  return (
    <>
      <th scope="col">
        {tag}
        <button className=" ml-2 ">
          {sortByAsc ? (
            <i
              class="fa-solid fa-arrow-up"
              onClick={() => {
                console.log('SORTED', tag);
                setSortByAsc(prev => !prev);
                return fetchSortedData(tagID, 'des');
              }}
            ></i>
          ) : (
            <i
              class="fa-solid fa-arrow-down"
              onClick={() => {
                setSortByAsc(prev => !prev);
                return fetchSortedData(tagID, 'asc');
              }}
            ></i>
          )}
        </button>
      </th>
    </>
  );
}

export default SortByTag;

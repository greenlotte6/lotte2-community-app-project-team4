import React, { useState } from 'react';

const departments = [
  { id: 1, name: '홍보 기획실', sub: [
    { id: 6, name: '홍보팀' },
    { id: 7, name: '브랜드팀' }
  ] },
  { id: 2, name: '경영전략팀', sub: [
    { id: 8, name: '전략기획팀' }
  ] },
  { id: 3, name: '개발 1실', sub: [
    { id: 4, name: '개발 1팀' },
    { id: 9, name: '개발 2팀' },
    { id: 10, name: '개발 3팀' }
  ] },
  { id: 5, name: '개발 2실', sub: [
    { id: 11, name: '테스트팀' }
  ] },
];

export const InviteDepartList = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedSubId, setSelectedSubId] = useState(null); 

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setSelectedSubId(null); 
  };

  const handleSubClick = (subId) => {
    setSelectedSubId(subId);
  };

  return (
    <div className="accordion-depart">
      <h3>조직도 목록</h3>
      <ul>
        {departments.map((dept, i) => (
          <li key={dept.id}>
            <div
              onClick={() => toggleOpen(i)}
              className={`accordion-header ${openIndex === i ? 'active' : ''}`}
            >
              {dept.name}
            </div>
            {openIndex === i && dept.sub.length > 0 && (
              <ul className="accordion-sub">
                {dept.sub.map((subDept) => (
                  <li
                    key={subDept.id}
                    onClick={() => handleSubClick(subDept.id)}
                    className={selectedSubId === subDept.id ? 'active' : ''}
                  >
                    {subDept.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};


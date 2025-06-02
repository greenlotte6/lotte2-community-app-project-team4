import React from "react";

export const About = () => {
  return (
    <div id="about" className="content-page">
      <section className="about-content">
        <h3 className="about-title">우리가 이 툴을 만든 이유</h3>
        <p>
          사내 협업을 위한 툴은 많지만, 정작 팀원들이 자주 쓰고, 진짜 도움이
          되는 툴은 많지 않았습니다. <br /> 여러 개의 툴을 왔다 갔다 하며
          커뮤니케이션은 끊기고, 문서는 흩어지고, 일정은 공유되지 않았습니다.
          <br />
          툴이 일을 더 복잡하게 만들고 있다는 아이러니에 우리는 주목했습니다.
          <br />
          그래서 우리는 묻기 시작했습니다. <br />
          <br />
          <br />
          <span className="highlight">
            "정말 필요한 협업툴은 어떤 모습이어야 할까?"
          </span>
        </p>
      </section>
      <section className="about-content">
        <h3 className="about-title">우리가 추구하는 가치</h3>
        <ol>
          <li>1. 단순함이 최고의 생산성이다</li>
          <p>
            기능은 많을수록 좋지 않습니다. <br />
            팀이 진짜 자주 쓰는 기능만, 직관적으로 설계합니다. <br />
            누구나 처음 써도 헤매지 않도록. <br />
          </p>
          <li>2. 정보는 흩어지지 않아야 한다</li>
          <p>
            일정, 대화, 문서, 파일이 하나의 공간에 통합되어 언제든 쉽게 찾고,{" "}
            <br />
            연결될 수 있어야 합니다.
          </p>
          <li>3. 좋은 협업은 '소통'에서 시작된다</li>
          <p>
            우리는 팀원 간의 원활한 소통을 가장 중요하게 생각합니다. <br />
            채팅이든 문서든, 모든 기능이 더 나은 커뮤니케이션을 위해 설계되어야
            한다고 믿습니다. <br />
          </p>
        </ol>
      </section>
    </div>
  );
};

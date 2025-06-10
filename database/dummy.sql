INSERT INTO `plan_name` VALUES (1, "Free");
INSERT INTO `plan_name` VALUES (2, "Plus");

INSERT INTO `plan_benefits` VALUES (1, "드라이브 용량 1GB, 파일 업로드 최대 5MB\n프로젝트 최대 3개\n프로젝트 협업자 최대 5명\n최대 3명 DM 발송\n게시판 최대 3개\n");
INSERT INTO `plan_benefits` VALUES (2, "드라이브 용량 2GB, 무제한 파일\n프로젝트 무제한\n프로젝트 협업자 최대 10명\nDM 발송 무제한\n게시판 무제한\n");

INSERT INTO `plan` VALUES (1, 1, 0, 1);
INSERT INTO `plan` VALUES (2, 2,  99000, 2);

#비밀번호: abc@1234567
INSERT INTO `user` VALUES ("abc123", "abc123@example.com", "$2a$12$G5OwzcXNHz51v30Givzg6eH61o4ROJLqpTCEYlUj5hDrjSUoqUjMm", NULL, 1, "normal");

SELECT
u.id,
pn.`id`,
pn.`name`
FROM `user` u
LEFT JOIN profile_images `pi`
ON u.profile_image_id = `pi`.id
JOIN plan 
ON u.plan_id = plan.id
JOIN plan_name `pn`
ON plan.name_id = pn.id;
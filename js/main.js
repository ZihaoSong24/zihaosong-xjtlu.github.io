"use strict";

/*
 * 个人资料集中在这里。修改引号中的文字，保存并刷新网页即可。
 * 未知资料保留为占位，不代表已经完成任何课程项目或掌握任何技能。
 * email / githubUsername 留空时，网页不显示无效的联系链接。
 * 将 projectTemplates、skillTemplates 改为 false，可隐藏对应的示例提示。
 * 修改时保留逗号和引号；段落文字不要直接换行，可用 \n 表示换行。
 */
const PROFILE = {
  name: "你的姓名",
  school: "你的学校",
  major: "你的专业",
  year: "你的年级",
  interests: "你的兴趣方向",
  email: "", // 例如 name@example.com；只填写愿意公开的邮箱。
  githubUsername: "", // 只填 GitHub 用户名，不填完整网址。
  intro: "在这里，记录我的课程实践、项目过程，以及每一次新的尝试。",
  aboutHeading: "正在学习，也在尝试\n把知识变成自己的作品。",
  about: [
    "这里填写你的个人简介：你正在学习什么，为什么对这个方向感兴趣，以及希望尝试什么。",
    "你也可以写一段真实的学习经历，例如某次课程实验中遇到的问题、你如何解决，以及接下来想深入的方向。"
  ],
  nextNote: "保持好奇，把今天没弄懂的问题，变成明天的小实验。",
  contactIntro: "欢迎交流课程想法、学习心得和有趣的小项目。",
  projectTemplates: true,
  skillTemplates: true,
  projects: [
    {
      category: "web", // 可选 web（网页）、network（网络）、other（其他）。
      title: "个人主页搭建",
      status: "课程项目模板 · 待补充个人内容",
      summary: "用网页介绍自己，整理学习方向和项目记录，并尝试通过 GitHub Pages 发布。",
      tags: ["HTML", "CSS", "JavaScript"],
      url: "", // 项目真实地址；暂时没有就留空，不会产生空链接。
      details: [
        { title: "实践内容", text: "使用 HTML 组织内容、CSS 调整排版，并用 JavaScript 实现移动端菜单和项目筛选。" },
        { title: "我的记录（待填写）", text: "发布后补充自己的网页地址、设计思路，以及实际遇到并解决的问题。" }
      ]
    },
    {
      category: "network",
      title: "UDP / RTP 视频传输实验",
      status: "CSI205 Lab 6 · 实验记录模板",
      summary: "使用两个 VLC 窗口分别充当发送端和接收端，尝试在本机进行 UDP 与 RTP 视频传输。",
      tags: ["VLC", "UDP", "RTP"],
      url: "",
      details: [
        { title: "实验目标", text: "按课件分别尝试 UDP 端口 1234 与 RTP 端口 5004，观察接收端能否播放。" },
        { title: "我的记录（待填写）", text: "完成实验后补充设置、实际结果和故障排查过程。此处的模板文字不代表实验已经完成。" }
      ]
    },
    {
      category: "other",
      title: "下一个小项目",
      status: "个人探索 · 待替换",
      summary: "把一个感兴趣的问题变成小项目，可以是课程作品、数据分析、网页工具，或其他真实实践。",
      tags: ["你的主题", "你的工具"],
      url: "",
      details: [
        { title: "我想解决的问题（待填写）", text: "写清楚这个项目的出发点，以及希望给使用者带来什么帮助。" },
        { title: "过程与结果（待填写）", text: "记录实际使用的方法、遇到的问题和最后的结果，也可以补充源代码链接。" }
      ]
    }
  ],
  skills: [
    { name: "网页开发", description: "示例方向：HTML 页面结构、CSS 响应式布局、JavaScript 基础交互。" },
    { name: "计算机网络", description: "示例方向：IP 地址、端口，以及 UDP / RTP 视频传输实验。" },
    { name: "项目表达", description: "示例方向：整理实验过程、介绍设计选择、使用 GitHub 展示作品。" }
  ]
};

// 以下为页面逻辑。只调整个人内容时，无需修改。
const $ = (selector) => document.querySelector(selector);

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function safeWebUrl(value) {
  try {
    const url = new URL(String(value || ""));
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch { return ""; }
}

function renderProfile() {
  document.querySelectorAll("[data-profile]").forEach(node => {
    const value = PROFILE[node.dataset.profile];
    if (typeof value === "string") node.textContent = value;
  });
  document.title = `${PROFILE.name} · 个人学习与项目档案`;
  $('meta[name="description"]').content = `${PROFILE.name}的个人主页。${PROFILE.intro}`;
  $("#current-year").textContent = String(new Date().getFullYear());
  $("#about-text").replaceChildren(...PROFILE.about.map(text => element("p", "", text)));
  $("#project-template-note").hidden = !PROFILE.projectTemplates;
  $("#skill-template-note").hidden = !PROFILE.skillTemplates;
}

function renderProjects() {
  const nodes = PROFILE.projects.map((project, index) => {
    const article = element("article", "project");
    article.dataset.category = project.category;
    article.append(element("span", "project-number", String(index + 1).padStart(2, "0")));
    const body = element("div", "project-body");
    body.append(element("p", "project-status", project.status), element("h3", "", project.title), element("p", "project-summary", project.summary));
    article.append(body);
    const side = element("div", "project-side");
    const tags = element("div", "project-tags");
    (project.tags || []).forEach(tag => tags.append(element("span", "project-tag", tag)));
    side.append(tags);
    const href = safeWebUrl(project.url);
    if (href) {
      const link = element("a", "project-link", "查看项目 ↗");
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `查看项目：${project.title}（在新标签页打开）`);
      side.append(link);
    }
    article.append(side);
    if (project.details?.length) {
      const details = element("details", "project-details");
      details.append(element("summary", "", "展开项目记录"));
      const content = element("div", "detail-content");
      project.details.forEach(item => {
        const block = element("div", "detail-item");
        block.append(element("h4", "", item.title), element("p", "", item.text));
        content.append(block);
      });
      details.append(content);
      article.append(details);
    }
    return article;
  });
  $("#project-list").replaceChildren(...nodes);
  $("#filter-status").textContent = `${nodes.length} 个项目`;
}

function renderSkills() {
  $("#skill-list").replaceChildren(...PROFILE.skills.map(skill => {
    const row = element("div", "skill-row");
    row.append(element("h3", "skill-name", skill.name), element("p", "skill-description", skill.description));
    return row;
  }));
}

function setupFilters() {
  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      let visible = 0;
      document.querySelectorAll("[data-filter]").forEach(item => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      document.querySelectorAll(".project").forEach(project => {
        project.hidden = filter !== "all" && project.dataset.category !== filter;
        if (!project.hidden) visible++;
      });
      $("#filter-status").textContent = visible ? `${visible} 个项目` : "暂无此类项目";
    });
  });
}

function setupNavigation() {
  const toggle = $(".menu-toggle");
  const nav = $("#site-nav");
  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    $(".menu-label").textContent = "菜单";
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    $(".menu-label").textContent = open ? "关闭" : "菜单";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", close));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) { close(); toggle.focus(); }
  });
  document.addEventListener("click", event => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) close();
  });
  window.matchMedia("(min-width: 761px)").addEventListener("change", close);
}

function setupContact() {
  const email = PROFILE.email.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (validEmail) {
    const link = $("#email-link");
    link.href = `mailto:${email}`;
    link.textContent = email;
    link.hidden = false;
    $("#copy-email").hidden = false;
    $("#copy-email").addEventListener("click", async () => {
      try {
        if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(email);
        $("#copy-status").textContent = "邮箱已复制。";
      } catch {
        $("#copy-status").textContent = `请手动复制：${email}`;
      }
    });
  }
  const username = PROFILE.githubUsername.trim();
  const validUsername = /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(username);
  if (validUsername) {
    $("#github-link").href = `https://github.com/${encodeURIComponent(username)}`;
    $("#github-link").hidden = false;
  }
  $("#contact-placeholder").hidden = validEmail || validUsername;
}

renderProfile();
renderProjects();
renderSkills();
setupFilters();
setupNavigation();
setupContact();
$("#print-button").addEventListener("click", () => window.print());

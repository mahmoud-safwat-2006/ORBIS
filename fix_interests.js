const fs = require('fs');
const path = 'src/lib/interests.ts';
let code = fs.readFileSync(path, 'utf8');

const replacement = `export function useInterestsDisplayNames() {
  const {_} = useLingui()

  return useMemo<Record<string, string>>(() => {
    return {
      animals: "حيوانات",
      art: "فنون",
      books: "كتب",
      comedy: "كوميديا",
      comics: "قصص مصورة",
      culture: "ثقافة",
      dev: "برمجة وتطوير",
      education: "تعليم",
      finance: "اقتصاد ومال",
      food: "طعام وطبخ",
      gaming: "ألعاب فيديو",
      journalism: "صحافة",
      movies: "أفلام",
      music: "موسيقى",
      nature: "طبيعة",
      news: "أخبار",
      pets: "حيوانات أليفة",
      photography: "تصوير",
      politics: "سياسة",
      science: "علوم",
      sports: "رياضة",
      tech: "تقنية",
      tv: "تلفزيون وسينما",
      writers: "كتاب ومؤلفون",
    } satisfies Record<Interest, string>
  }, [_])
}`;

code = code.replace(/export function useInterestsDisplayNames\(\)[\s\S]*?satisfies Record<Interest, string>\s*\}, \[_\]\)\s*\}/, replacement);

fs.writeFileSync(path, code, 'utf8');
console.log('SUCCESS: Translated interests.ts cleanly to Arabic!');

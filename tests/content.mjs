import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {lessons,works,standardTexts,learningNotes} from '../app/curriculum.ts';
const expected={'문학 기초':2,'10공국1-05-01':2,'10공국1-05-02':2,'10공국1-05-03':2,'10공국2-05-01':3,'10공국2-05-02':3};
assert.equal(lessons.length,14); assert.equal(works.length,5);
assert.deepEqual(lessons.map(l=>l.id),Array.from({length:14},(_,i)=>i+1));
const counts=Object.fromEntries(Object.keys(expected).map(k=>[k,lessons.filter(l=>l.standard===k).length]));
assert.deepEqual(counts,expected);
for(const l of lessons){assert.ok(l.title&&l.goal&&l.concept&&l.check&&l.work);assert.equal(l.activity.length,3);assert.equal(learningNotes[l.id].paragraphs.length,2);if(l.standard!=='문학 기초')assert.ok(standardTexts[l.standard]);}
assert.ok(works.some(w=>w.author==='김선영'));
for(const path of ['app/classroom.tsx','app/admin/editor.tsx','app/curriculum.ts']){const text=readFileSync(path,'utf8');assert.ok(!text.includes('�')&&!text.includes('臾명'),`${path} 인코딩 이상`)}
console.log('14차시·5작품·성취기준·개념·인코딩 검사 통과');


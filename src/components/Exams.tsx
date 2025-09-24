import React, { useState } from 'react';
import { Plus, Edit3, ToggleLeft, ToggleRight } from 'lucide-react';

interface ExamCard {
  id: string;
  type: 'quarterly' | 'halfly' | 'annual' | 'monthly' | 'aptitude' | 'practical';
  entries: { date: string; subject: string }[];
}

interface StudentResult {
  name: string;
  tamil: { pass: number; fail: number };
  english: { pass: number; fail: number };
  science: { pass: number; fail: number };
  maths: { pass: number; fail: number };
}

interface ClassResult {
  class: string;
  tamil: { pass: number; fail: number };
  english: { pass: number; fail: number };
  science: { pass: number; fail: number };
  maths: { pass: number; fail: number };
}

const Exams: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'exam' | 'result'>('exam');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  
  // Result tab states
  const [resultView, setResultView] = useState<'overall' | 'classwise'>('overall');
  const [resultClass, setResultClass] = useState('');
  const [resultSection, setResultSection] = useState('');
  const [resultGroup, setResultGroup] = useState('');

  const [examCards, setExamCards] = useState<ExamCard[]>([
    { id: '1', type: 'quarterly', entries: [{ date: '', subject: '' }] }
  ]);

  const [monthlyCards, setMonthlyCards] = useState<ExamCard[]>([
    { id: 'aptitude1', type: 'aptitude', entries: [{ date: '', subject: '' }] }
  ]);

  const [practicalCards, setPracticalCards] = useState<ExamCard[]>([
    { id: 'practical1', type: 'practical', entries: [{ date: '', subject: '' }] }
  ]);

  // Sample data for results
  const overallResults: ClassResult[] = [
    { class: 'Class 1', tamil: { pass: 25, fail: 5 }, english: { pass: 28, fail: 2 }, science: { pass: 20, fail: 10 }, maths: { pass: 22, fail: 8 } },
    { class: 'Class 2', tamil: { pass: 30, fail: 3 }, english: { pass: 31, fail: 2 }, science: { pass: 25, fail: 8 }, maths: { pass: 27, fail: 6 } },
  ];

  const studentResults: StudentResult[] = [
    { name: 'John Doe', tamil: { pass: 85, fail: 0 }, english: { pass: 90, fail: 0 }, science: { pass: 78, fail: 0 }, maths: { pass: 82, fail: 0 } },
    { name: 'Jane Smith', tamil: { pass: 0, fail: 45 }, english: { pass: 88, fail: 0 }, science: { pass: 92, fail: 0 }, maths: { pass: 0, fail: 42 } },
  ];

  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  const sections = ['A', 'B', 'C', 'D'];
  const groups = ['Group 1', 'Group 2', 'Group 3'];
  const years = ['2023-24', '2024-25', '2025-26'];

  const addExamCard = (type: 'halfly' | 'annual') => {
    const newCard: ExamCard = {
      id: Date.now().toString(),
      type,
      entries: [{ date: '', subject: '' }]
    };
    setExamCards([...examCards, newCard]);
  };

  const addEntry = (cardId: string, cardType: 'exam' | 'monthly' | 'practical') => {
    const newEntry = { date: '', subject: '' };
    
    if (cardType === 'exam') {
      setExamCards(cards => 
        cards.map(card => 
          card.id === cardId 
            ? { ...card, entries: [...card.entries, newEntry] }
            : card
        )
      );
    } else if (cardType === 'monthly') {
      setMonthlyCards(cards => 
        cards.map(card => 
          card.id === cardId 
            ? { ...card, entries: [...card.entries, newEntry] }
            : card
        )
      );
    } else {
      setPracticalCards(cards => 
        cards.map(card => 
          card.id === cardId 
            ? { ...card, entries: [...card.entries, newEntry] }
            : card
        )
      );
    }
  };

  const updateEntry = (cardId: string, entryIndex: number, field: 'date' | 'subject', value: string, cardType: 'exam' | 'monthly' | 'practical') => {
    if (cardType === 'exam') {
      setExamCards(cards =>
        cards.map(card =>
          card.id === cardId
            ? {
                ...card,
                entries: card.entries.map((entry, index) =>
                  index === entryIndex ? { ...entry, [field]: value } : entry
                )
              }
            : card
        )
      );
    } else if (cardType === 'monthly') {
      setMonthlyCards(cards =>
        cards.map(card =>
          card.id === cardId
            ? {
                ...card,
                entries: card.entries.map((entry, index) =>
                  index === entryIndex ? { ...entry, [field]: value } : entry
                )
              }
            : card
        )
      );
    } else {
      setPracticalCards(cards =>
        cards.map(card =>
          card.id === cardId
            ? {
                ...card,
                entries: card.entries.map((entry, index) =>
                  index === entryIndex ? { ...entry, [field]: value } : entry
                )
              }
            : card
        )
      );
    }
  };

  const addMonthlyCard = () => {
    const newCard: ExamCard = {
      id: Date.now().toString(),
      type: 'monthly',
      entries: [{ date: '', subject: '' }]
    };
    setMonthlyCards([...monthlyCards, newCard]);
  };

  const addPracticalCard = () => {
    const newCard: ExamCard = {
      id: Date.now().toString(),
      type: 'practical',
      entries: [{ date: '', subject: '' }]
    };
    setPracticalCards([...practicalCards, newCard]);
  };

  const calculateTotals = (results: ClassResult[]) => {
    return results.reduce(
      (acc, curr) => ({
        tamil: { pass: acc.tamil.pass + curr.tamil.pass, fail: acc.tamil.fail + curr.tamil.fail },
        english: { pass: acc.english.pass + curr.english.pass, fail: acc.english.fail + curr.english.fail },
        science: { pass: acc.science.pass + curr.science.pass, fail: acc.science.fail + curr.science.fail },
        maths: { pass: acc.maths.pass + curr.maths.pass, fail: acc.maths.fail + curr.maths.fail }
      }),
      { tamil: { pass: 0, fail: 0 }, english: { pass: 0, fail: 0 }, science: { pass: 0, fail: 0 }, maths: { pass: 0, fail: 0 } }
    );
  };

  const calculateOverallPercentages = () => {
    const totals = calculateTotals(overallResults);
    const totalStudents = Object.values(totals).reduce((sum, subject) => sum + subject.pass + subject.fail, 0);
    const totalPass = Object.values(totals).reduce((sum, subject) => sum + subject.pass, 0);
    const totalFail = Object.values(totals).reduce((sum, subject) => sum + subject.fail, 0);
    
    return {
      passPercentage: ((totalPass / totalStudents) * 100).toFixed(2),
      failPercentage: ((totalFail / totalStudents) * 100).toFixed(2),
      totalPercentage: '100.00'
    };
  };

  const renderExamCard = (card: ExamCard, cardType: 'exam' | 'monthly' | 'practical') => (
    <div key={card.id} className="bg-white rounded-lg border border-gray-200 p-4 min-w-80">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-gray-800 capitalize">{card.type}</h4>
        <Edit3 className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
      </div>
      
      {card.entries.map((entry, index) => (
        <div key={index} className="mb-4">
          <div className="flex gap-4 mb-2">
            <div className="flex-1">
              <input
                type="date"
                value={entry.date}
                onChange={(e) => updateEntry(card.id, index, 'date', e.target.value, cardType)}
                className="w-full border-0 border-b border-gray-300 focus:border-blue-500 focus:outline-none pb-1"
                placeholder="Date"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={entry.subject}
                onChange={(e) => updateEntry(card.id, index, 'subject', e.target.value, cardType)}
                className="w-full border-0 border-b border-gray-300 focus:border-blue-500 focus:outline-none pb-1"
                placeholder="Subject"
              />
            </div>
          </div>
          {index === card.entries.length - 1 && (
            <div className="flex justify-end">
              <button
                onClick={() => addEntry(card.id, cardType)}
                className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 text-xs"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderAddCard = (onClick: () => void, title: string) => (
    <div 
      onClick={onClick}
      className="bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 p-4 min-w-80 flex items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50"
    >
      <div className="text-center">
        <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <span className="text-gray-500">{title}</span>
      </div>
    </div>
  );

  const showDetails = selectedClass && selectedSection && selectedGroup && selectedYear;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('exam')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'exam'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Exam
            </button>
            <button
              onClick={() => setActiveTab('result')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'result'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Result
            </button>
          </div>
        </div>

        {/* Exam Tab */}
        {activeTab === 'exam' && (
          <div className="space-y-6">
            {/* Dropdowns */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Class</option>
                    {classes.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Section</option>
                    {sections.map(section => (
                      <option key={section} value={section}>{section}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Group</label>
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Group</option>
                    {groups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Exam Details */}
            {showDetails && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Exam</h2>
                
                {/* Main Exam Card */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">{selectedYear}</h3>
                  
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {examCards.map(card => renderExamCard(card, 'exam'))}
                    
                    {!examCards.find(card => card.type === 'halfly') && (
                      renderAddCard(() => addExamCard('halfly'), 'Add Halfly')
                    )}
                    
                    {!examCards.find(card => card.type === 'annual') && examCards.find(card => card.type === 'halfly') && (
                      renderAddCard(() => addExamCard('annual'), 'Add Annual')
                    )}
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={addMonthlyCard}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Monthly Cards */}
                {monthlyCards.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Monthly</h3>
                    
                    <div className="flex gap-4 overflow-x-auto pb-4">
                      {monthlyCards.map(card => renderExamCard(card, 'monthly'))}
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        onClick={addMonthlyCard}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}

                {/* Practical Cards */}
                {practicalCards.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Practical</h3>
                    
                    <div className="flex gap-4 overflow-x-auto pb-4">
                      {practicalCards.map(card => renderExamCard(card, 'practical'))}
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        onClick={addPracticalCard}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Result Tab */}
        {activeTab === 'result' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Score</h2>
            
            {/* Toggle Button */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-center">
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setResultView('overall')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      resultView === 'overall'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Overall
                  </button>
                  <button
                    onClick={() => setResultView('classwise')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      resultView === 'classwise'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Classwise
                  </button>
                </div>
              </div>
            </div>

            {/* Overall Results */}
            {resultView === 'overall' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Overall</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Class</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b border-l" colSpan={2}>Tamil</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b border-l" colSpan={2}>English</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b border-l" colSpan={2}>Science</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b border-l" colSpan={2}>Maths</th>
                      </tr>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 border-b"></th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 border-b border-l">Pass</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 border-b">Fail</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 border-b border-l">Pass</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 border-b">Fail</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 border-b border-l">Pass</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 border-b">Fail</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 border-b border-l">Pass</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 border-b">Fail</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {overallResults.map((result, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 border-b">{result.class}</td>
                          <td className="px-4 py-3 text-sm text-center text-green-600 border-b border-l">{result.tamil.pass}</td>
                          <td className="px-4 py-3 text-sm text-center text-red-600 border-b">{result.tamil.fail}</td>
                          <td className="px-4 py-3 text-sm text-center text-green-600 border-b border-l">{result.english.pass}</td>
                          <td className="px-4 py-3 text-sm text-center text-red-600 border-b">{result.english.fail}</td>
                          <td className="px-4 py-3 text-sm text-center text-green-600 border-b border-l">{result.science.pass}</td>
                          <td className="px-4 py-3 text-sm text-center text-red-600 border-b">{result.science.fail}</td>
                          <td className="px-4 py-3 text-sm text-center text-green-600 border-b border-l">{result.maths.pass}</td>
                          <td className="px-4 py-3 text-sm text-center text-red-600 border-b">{result.maths.fail}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-100 font-semibold">
                        <td className="px-4 py-3 text-sm text-gray-900 border-b">Total</td>
                        <td className="px-4 py-3 text-sm text-center text-green-600 border-b border-l">
                          {calculateTotals(overallResults).tamil.pass}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-red-600 border-b">
                          {calculateTotals(overallResults).tamil.fail}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-green-600 border-b border-l">
                          {calculateTotals(overallResults).english.pass}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-red-600 border-b">
                          {calculateTotals(overallResults).english.fail}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-green-600 border-b border-l">
                          {calculateTotals(overallResults).science.pass}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-red-600 border-b">
                          {calculateTotals(overallResults).science.fail}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-green-600 border-b border-l">
                          {calculateTotals(overallResults).maths.pass}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-red-600 border-b">
                          {calculateTotals(overallResults).maths.fail}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end mt-6 space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{calculateOverallPercentages().passPercentage}%</div>
                    <div className="text-sm text-gray-600">Overall Pass Percentage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{calculateOverallPercentages().failPercentage}%</div>
                    <div className="text-sm text-gray-600">Overall Fail Percentage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{calculateOverallPercentages().totalPercentage}%</div>
                    <div className="text-sm text-gray-600">Total Percentage</div>
                  </div>
                </div>
              </div>
            )}

            {/* Classwise Results */}
            {resultView === 'classwise' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Classwise</h3>
                
                {/* Dropdowns for classwise */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Standard</label>
                    <select
                      value={resultClass}
                      onChange={(e) => setResultClass(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Standard</option>
                      {classes.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                    <select
                      value={resultSection}
                      onChange={(e) => setResultSection(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Section</option>
                      {sections.map(section => (
                        <option key={section} value={section}>{section}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Group</label>
                    <select
                      value={resultGroup}
                      onChange={(e) => setResultGroup(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Group</option>
                      {groups.map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {resultClass && resultSection && resultGroup && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Name</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b border-l">Tamil</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b border-l">English</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b border-l">Science</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b border-l">Maths</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {studentResults.map((student, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900 border-b">{student.name}</td>
                            <td className="px-4 py-3 text-sm text-center border-b border-l">
                              {student.tamil.pass > 0 ? (
                                <span className="text-green-600">{student.tamil.pass}</span>
                              ) : (
                                <span className="text-red-600">{student.tamil.fail}</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-center border-b border-l">
                              {student.english.pass > 0 ? (
                                <span className="text-green-600">{student.english.pass}</span>
                              ) : (
                                <span className="text-red-600">{student.english.fail}</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-center border-b border-l">
                              {student.science.pass > 0 ? (
                                <span className="text-green-600">{student.science.pass}</span>
                              ) : (
                                <span className="text-red-600">{student.science.fail}</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-center border-b border-l">
                              {student.maths.pass > 0 ? (
                                <span className="text-green-600">{student.maths.pass}</span>
                              ) : (
                                <span className="text-red-600">{student.maths.fail}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Exams;
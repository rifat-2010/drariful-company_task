import React from 'react'
import Nav from '../Header/Nav'
import { useState, useEffect } from 'react';
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import publicationsData from '../data/publications.json';
import PublicationCard from '../components/PublicationCard';
import Footer from '../Footer/Footer';

export default function Publications() {

  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [filters, setFilters] = useState({
    field: [],
    status: [],
    authorship: []
  });

  const [sortOrder, setSortOrder] = useState('desc'); // desc = newest first

  // Initialize data
  useEffect(() => {
    setPublications(publicationsData);
    setFilteredPublications(publicationsData);
  }, []);

  // Field options for filter
  const fieldOptions = [
    { value: 'Cancer', label: 'Cancer' },
    { value: 'Renal', label: 'Renal' },
    { value: 'Cytology', label: 'Cytology' },
    { value: 'Education', label: 'Education' },
    { value: 'COVID-19', label: 'COVID-19' },
  ];

  // Status options for filter
  const statusOptions = [
    { value: 'Published', label: 'Published' },
    { value: 'Submitted', label: 'Submitted' },
    { value: 'Ongoing', label: 'Ongoing' },
  ];

  // Authorship options for filter
  const authorshipOptions = [
    { value: 'Principal author', label: 'Principal' },
    { value: 'Co author', label: 'Co-author' },
    // { value: 'Co-Author', label: 'Co-Author' },
  ];

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFiltersAndSearch(term, filters);
  };

  // Handle field filter change
  const handleFieldFilterChange = (field) => {
    const newFieldFilters = filters.field.includes(field)
      ? filters.field.filter(f => f !== field)
      : [...filters.field, field];

    const newFilters = { ...filters, field: newFieldFilters };
    setFilters(newFilters);
    applyFiltersAndSearch(searchTerm, newFilters);
  };

  // Handle status filter change
  const handleStatusFilterChange = (status) => {
    const newStatusFilters = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];

    const newFilters = { ...filters, status: newStatusFilters };
    setFilters(newFilters);
    applyFiltersAndSearch(searchTerm, newFilters);
  };

  // Handle authorship filter change
  const handleAuthorshipFilterChange = (authorship) => {
    const newAuthorshipFilters = filters.authorship.includes(authorship)
      ? filters.authorship.filter(a => a !== authorship)
      : [...filters.authorship, authorship];

    const newFilters = { ...filters, authorship: newAuthorshipFilters };
    setFilters(newFilters);
    applyFiltersAndSearch(searchTerm, newFilters);
  };

  // Toggle sort order between ascending and descending
  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    setSortOrder(newSortOrder);

    const sorted = [...filteredPublications].sort((a, b) => {
      if (newSortOrder === 'desc') {
        return parseInt(b.year) - parseInt(a.year);
      } else {
        return parseInt(a.year) - parseInt(b.year);
      }
    });

    setFilteredPublications(sorted);
  };

  // Apply filters and search
  const applyFiltersAndSearch = (term, currentFilters) => {
    let result = [...publications];

    // Apply search term
    if (term) {
      const lowerCaseTerm = term.toLowerCase();
      result = result.filter(pub =>
        pub.title.toLowerCase().includes(lowerCaseTerm) ||
        pub.journal.toLowerCase().includes(lowerCaseTerm) ||
        pub.abstract.toLowerCase().includes(lowerCaseTerm)
      );
    }

    // Apply field filters
    if (currentFilters.field.length > 0) {
      result = result.filter(pub =>
        pub.field.some(field => currentFilters.field.includes(field))
      );
    }

    // Apply status filters
    if (currentFilters.status.length > 0) {
      result = result.filter(pub =>
        currentFilters.status.includes(pub.status)
      );
    }

    // Apply authorship filters
    if (currentFilters.authorship.length > 0) {
      result = result.filter(pub =>
        currentFilters.authorship.includes(pub.authorship)
      );
    }

    // Apply sort
    result.sort((a, b) => {
      if (sortOrder === 'desc') {
        return parseInt(b.year) - parseInt(a.year);
      } else {
        return parseInt(a.year) - parseInt(b.year);
      }
    });

    setFilteredPublications(result);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({ field: [], status: [], authorship: [] });
    setSearchTerm('');
    setFilteredPublications([...publications].sort((a, b) =>
      sortOrder === 'desc' ? parseInt(b.year) - parseInt(a.year) : parseInt(a.year) - parseInt(b.year)
    ));
  };

  return (
    <div>
      <Nav></Nav>

      <section id="publications" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-center heading">Research & Publications</h2>
              <p className='primary-text text-center mb-8'>
                I am an enthusiastic researcher with 32 publications so far focusing on Nephropathology, Gynaepathology, Lymphoreticular pathology, Head neck pathology and molecular pathology. My carrier focus is translational cancer research, precision cancer medicine and clinical trial.
              </p>
              
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white p-5 rounded-xl shadow-md mb-8">
            <p className="primary-text text-center mb-5 font-semibold sub-title">Browse through my published research papers and ongoing studies</p>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search titles, journals, or keywords..."
                    className="block w-full pl-10 pr-3 py-2.5 border border-[#003878] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-[#003878]"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>

                {/* Sort Button */}

                <button
                  onClick={toggleSortOrder}
                  className="hidden md:flex items-center justify-center gap-2 heading border-2 border-[#003878] rounded-2xl px-4"
                >
                  {sortOrder === 'desc' ? (
                    <>
                      <FaSortAmountDown /> <span>Newest First</span>
                    </>
                  ) : (
                    <>
                      <FaSortAmountUp /> <span>Oldest First</span>
                    </>
                  )}
                </button>


                {/* Clear Filters Button */}
                {(filters.field.length > 0 || filters.status.length > 0 || filters.authorship.length > 0 || searchTerm) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Field Filters */}
              <div className="mb-6">
                <h3 className="text-sm font-medium sub-title mb-2">Filter by Field</h3>
                <div className="flex flex-wrap gap-2">
                  {fieldOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleFieldFilterChange(option.value)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filters.field.includes(option.value)
                        ? 'bg-blue-50 heading'
                        : 'bg-gray-100 primary-text hover:bg-gray-200'
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Filters */}
              <div className="flex flex-wrap gap-10">
                {/* Status Filter */}
                <div>
                  <h3 className="text-sm font-medium sub-title mb-2">Publication Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleStatusFilterChange(option.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filters.status.includes(option.value)
                          ? 'bg-gray-300 primary-text'
                          : 'bg-gray-100 primary-text hover:bg-gray-200'
                          }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Authorship Filter */}
                <div>
                  <h3 className="text-sm font-medium sub-title mb-2">Authorship</h3>
                  <div className="flex flex-wrap gap-2">
                    {authorshipOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleAuthorshipFilterChange(option.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filters.authorship.includes(option.value)
                          ? 'bg-purple-100 sub-title'
                          : 'bg-gray-100 primary-text hover:bg-gray-200'
                          }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6 text-sm sub-title">
              Showing {filteredPublications.length} of {publications.length} publications
            </div>

            {/* Publications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPublications.map(publication => (
                <PublicationCard key={publication.id} publication={publication}></PublicationCard>
              ))}
            </div>

            {/* No Results Message */}
            {filteredPublications.length === 0 && (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <p className="primary-text text-lg mb-4">No publications match your search criteria</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 active-btn"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  )
}

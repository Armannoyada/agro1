<?php
require_once 'config/database.php';

$conn = getDBConnection();

// Sample team members
$teamMembers = [
    [
        'name' => 'Dr. Ramesh Agarwal',
        'designation' => 'Founder & CEO',
        'bio' => '25+ years in agriculture. Former Director at Agricultural Research Institute.',
        'photo' => 'https://randomuser.me/api/portraits/men/75.jpg',
        'email' => 'ramesh@agrotech.com',
        'linkedin' => 'https://linkedin.com',
        'twitter' => 'https://twitter.com',
        'is_founder' => 1,
        'sort_order' => 1,
        'is_active' => 1
    ],
    [
        'name' => 'Sunita Sharma',
        'designation' => 'Co-Founder & COO',
        'bio' => 'MBA from IIM. 15 years experience in agribusiness management.',
        'photo' => 'https://randomuser.me/api/portraits/women/65.jpg',
        'email' => 'sunita@agrotech.com',
        'linkedin' => 'https://linkedin.com',
        'twitter' => 'https://twitter.com',
        'is_founder' => 1,
        'sort_order' => 2,
        'is_active' => 1
    ],
    [
        'name' => 'Vikram Singh',
        'designation' => 'Head of Operations',
        'bio' => 'Agriculture graduate with expertise in organic farming and supply chain.',
        'photo' => 'https://randomuser.me/api/portraits/men/42.jpg',
        'email' => 'vikram@agrotech.com',
        'linkedin' => 'https://linkedin.com',
        'twitter' => 'https://twitter.com',
        'is_founder' => 0,
        'sort_order' => 3,
        'is_active' => 1
    ],
    [
        'name' => 'Dr. Meera Patel',
        'designation' => 'Chief Technology Officer',
        'bio' => 'PhD in Agricultural Technology. Pioneer in smart farming solutions.',
        'photo' => 'https://randomuser.me/api/portraits/women/33.jpg',
        'email' => 'meera@agrotech.com',
        'linkedin' => 'https://linkedin.com',
        'twitter' => 'https://twitter.com',
        'is_founder' => 0,
        'sort_order' => 4,
        'is_active' => 1
    ]
];

$stmt = $conn->prepare("
    INSERT INTO team_members (name, designation, bio, photo, email, linkedin, twitter, is_founder, sort_order, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

foreach ($teamMembers as $member) {
    $stmt->execute([
        $member['name'],
        $member['designation'],
        $member['bio'],
        $member['photo'],
        $member['email'],
        $member['linkedin'],
        $member['twitter'],
        $member['is_founder'],
        $member['sort_order'],
        $member['is_active']
    ]);
    echo "Added: " . $member['name'] . "\n";
}

echo "Done! Added " . count($teamMembers) . " team members.\n";
?>
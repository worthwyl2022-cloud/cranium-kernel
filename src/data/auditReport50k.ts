export const PRECOMPILED_AUDIT_REPORT = {
  "campaignId": "CRANIUM-STRESS-50K-MTM8VRKS",
  "timestampIso": "2026-09-04T00:57:54.692Z",
  "totalTestsRun": 50000,
  "overallPassed": true,
  "totalGranted": 5000,
  "totalDenied": 45000,
  "attackDefensesCount": 45000,
  "legitimateGrantsCount": 5000,
  "categoryBreakdown": {
    "IDENTITY_SPOOFING": {
      "total": 7500,
      "granted": 0,
      "denied": 7500
    },
    "EVIDENCE_TAMPERING": {
      "total": 7500,
      "granted": 0,
      "denied": 7500
    },
    "REPLAY_COLLISION": {
      "total": 7500,
      "granted": 0,
      "denied": 7500
    },
    "EPOCH_DESYNC": {
      "total": 7500,
      "granted": 0,
      "denied": 7500
    },
    "ARBITRARY_DEMOTION": {
      "total": 5000,
      "granted": 0,
      "denied": 5000
    },
    "CONSTITUTIONAL_BYPASS": {
      "total": 5000,
      "granted": 0,
      "denied": 5000
    },
    "CANON_NLI_INJECTION": {
      "total": 5000,
      "granted": 0,
      "denied": 5000
    },
    "AUTHORIZED_VALID": {
      "total": 5000,
      "granted": 5000,
      "denied": 0
    }
  },
  "violationsBreakdown": {
    "MISSING_SUBJECT": 7500,
    "INVALID_AUTHORITY_JUMP": 7500,
    "INSUFFICIENT_EVIDENCE": 13122,
    "REPLAY_CONFLICT": 7500,
    "UNAUTHORIZED_REQUESTER": 7500,
    "STALE_AUTHORITY_VERSION": 7500,
    "DEGRADATION_WITHOUT_REASON": 5000,
    "CONSTITUTION_VIOLATION": 5000,
    "CANON_CONTRADICTION_QUARANTINE": 5000
  },
  "throughputOpsSec": 25510.2,
  "totalDurationMs": 1960,
  "masterMerkleRoot": "327ee3bd1e1baff477da60c31eb9a94a857730fbb716a5d5168a05319725a67c",
  "batches": [
    {
      "batchIndex": 0,
      "startIndex": 0,
      "endIndex": 999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "MISSING_SUBJECT": 1000
      },
      "batchMerkleRoot": "e60f225dae672852879f39eb8851c272d73389225c8d59a748fe0b757881afa4",
      "durationMs": 71,
      "avgLatencyMicros": 53,
      "p50LatencyMicros": 26,
      "p95LatencyMicros": 315,
      "p99LatencyMicros": 486,
      "maxLatencyMicros": 1238,
      "samples": [
        {
          "index": 0,
          "testId": "req_spoof_0_89ddd1",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "DROP_TABLE_ATOMS_0",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "3cd02280caeecf436edbd35aadca3a82d161457db552b92bd0517ae681ccb516",
          "receiptSignature": "dc62c18ab655b06a822140079d8234b2ae142cea3d1bc72fda139627559f8910",
          "latencyMicros": 863,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 1,
          "testId": "req_spoof_1_5063da",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_null_\u0000_1",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "6b7a9df75a823a41e6b3dac73f2ad67b629bc746d7fd4aea4bd0c569e219b154",
          "receiptSignature": "b0735ffca25fe879faa93226df50d3fc5abbe96125832dc66485bf2d3818fa0a",
          "latencyMicros": 1139,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 2,
          "testId": "req_spoof_2_10fda2",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_shadow_2",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "f45c5d6a535d469bf9fb1fe244e86f7dc7335d3542e8c10bf5943822e0614b9a",
          "receiptSignature": "e6ac1f3cfa9e3a35cf93b44d3e6712f46c97b402b849762730cd5228169ca1c9",
          "latencyMicros": 383,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 3,
          "testId": "req_spoof_3_a24a1a",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "DROP_TABLE_ATOMS_3",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "56a07af22bfaeda13934d26b33aa88e4e96592baef389565aa3cc6b57b9fa215",
          "receiptSignature": "f2d18d40a026d6c18268fd3ed0a7bc6ecca7edaa06515149b6fe2b9a0811659b",
          "latencyMicros": 433,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 4,
          "testId": "req_spoof_4_8742ba",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_phantom_90b4cb5a",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "9862356cdddfefb13c8ba03bedb8d285262e54db52fc76d19783c9e6ad86241e",
          "receiptSignature": "7d89360afeedcf6f424b9dc1085fbee151bf5016f1adf7b6e0fd2728389aa974",
          "latencyMicros": 402,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 999,
          "testId": "req_spoof_999_177378",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_ghost_519686",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "0cc2c1104fee69be6262dc8d94cadec9966baf56ece27fbaffb81c2172c68fb1",
          "receiptSignature": "50e72c171133e905a68feb5722e4ec61d756ec9387bf27e232074cb3db276c40",
          "latencyMicros": 26,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        }
      ]
    },
    {
      "batchIndex": 1,
      "startIndex": 1000,
      "endIndex": 1999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "MISSING_SUBJECT": 1000
      },
      "batchMerkleRoot": "6b8004aa5dfd57f59e7288c65c0630bd78a3cc4492074fa62303cdb1082ac6e4",
      "durationMs": 40,
      "avgLatencyMicros": 29,
      "p50LatencyMicros": 26,
      "p95LatencyMicros": 37,
      "p99LatencyMicros": 57,
      "maxLatencyMicros": 713,
      "samples": [
        {
          "index": 1000,
          "testId": "req_spoof_1000_71b02c",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_phantom_875dbc99",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "dd1939f09565ea171f9e080339e4026ff9eb0f22a3ef677b53bdcb9f194872b4",
          "receiptSignature": "80ab32b1f7549d8d4c33296156086db1660b74a9c26aee9b7fd845e49deb2203",
          "latencyMicros": 54,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 1001,
          "testId": "req_spoof_1001_a9cba9",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_null_\u0000_1001",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "f470bd504a7aba14c638cdd20c307c42b5f72bf460f0214c0ac07952a0d3f3a2",
          "receiptSignature": "843c94feaa9511853a87d70f64ffff907830fa2de0e8b8f115d69a323d3149cc",
          "latencyMicros": 31,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 1002,
          "testId": "req_spoof_1002_d0c4ec",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_ghost_4190054",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "7b41fb6315347cc25756ab08d5eee63224f1b1312ba128debe05ecd6f4c7b88f",
          "receiptSignature": "8e69aff98a7ca66fe960fb1ef41338ab79c90cdab57b177a8a49bd333b688f90",
          "latencyMicros": 29,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 1003,
          "testId": "req_spoof_1003_549009",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "DROP_TABLE_ATOMS_1003",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "88161b894670902e297b04d7d78ab6df76751e0127be35af13a61b6716d5a1bf",
          "receiptSignature": "97f720aae27791fef34a55d2668b19e2228a4f518bc5c3e621b33c4672285c0e",
          "latencyMicros": 25,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 1004,
          "testId": "req_spoof_1004_7bbe40",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "DROP_TABLE_ATOMS_1004",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "1882203c495ac56cc718b7a8631e6ab5bae2c607ea48bcfdce4c5fc7374964ed",
          "receiptSignature": "b2335f9c0a9556d43c74a7122d807a9605cb334173c5ee47e54cbf106d599bb7",
          "latencyMicros": 25,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 1999,
          "testId": "req_spoof_1999_0a21af",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_shadow_1999",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "2e08cff58ac8165a7b41b38195034efcac16963d937b7250efa06d6806b7a0d1",
          "receiptSignature": "36511d148acadc33a8faac0dea453a16bca36df9666740ccec32cb7c9ec42727",
          "latencyMicros": 26,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        }
      ]
    },
    {
      "batchIndex": 2,
      "startIndex": 2000,
      "endIndex": 2999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "MISSING_SUBJECT": 1000
      },
      "batchMerkleRoot": "63b9c87b3ca31baa46907b9aeff4aa42e9f18189600a1e807180f1787dac67da",
      "durationMs": 43,
      "avgLatencyMicros": 31,
      "p50LatencyMicros": 26,
      "p95LatencyMicros": 37,
      "p99LatencyMicros": 67,
      "maxLatencyMicros": 1497,
      "samples": [
        {
          "index": 2000,
          "testId": "req_spoof_2000_51b40e",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_ghost_2559407",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "4f4d96298d3b0dc89c022ed358fb711e677715a0a71f3b284688b0d806b805bf",
          "receiptSignature": "78f29ce72782d07080b2f22d0e9bd3abefb4d59ddb708f38296e46ccdce85b45",
          "latencyMicros": 56,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 2001,
          "testId": "req_spoof_2001_4b0957",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "../../etc/passwd_b231",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "6f390d790c3b77ea6a91b7b29e0ee186a1607e8de6534f2c9a04b261507a1579",
          "receiptSignature": "bebd9e4e48f8686261adc94ca5f765a9a92ee673f96b6de41a7a9df5b6bcf0ee",
          "latencyMicros": 32,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 2002,
          "testId": "req_spoof_2002_e00c9a",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_phantom_de3661d0",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "65c5a1d75e8d48b6e71fee818e6abf27fa5fba9c3fb820946968cd41b5169c47",
          "receiptSignature": "afd1aa1c27b469d3e60f04c1c5aed134946a5f9cb6311db837e460ddaf5169ce",
          "latencyMicros": 28,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 2003,
          "testId": "req_spoof_2003_1cf131",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "DROP_TABLE_ATOMS_2003",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "25fa219ce333e623bc672d05ca2ef640392879c23e77ccfcf572fd340647d66f",
          "receiptSignature": "807ca9e6839fb498af3b4ae437d1871d6f47d956198e2f1f2940ab4dd05e3c30",
          "latencyMicros": 51,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 2004,
          "testId": "req_spoof_2004_0db340",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_shadow_2004",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "91ca6e7944860682f46625c121bf934ede81ef749c92932232b6efe16cba2b98",
          "receiptSignature": "ebabcbde12af57d39364da2b607da746aa0961173fd3ce66e7ab2a2f5b9842f7",
          "latencyMicros": 29,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 2999,
          "testId": "req_spoof_2999_7787c7",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_null_\u0000_2999",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "72c2228a88275cb90d4e0a08d05ab3214bded56f4716093b8c1cc4cf87ecff84",
          "receiptSignature": "64de477a3eabbc7b0adc59d1c60594aab6f56287cb2679ff9eb1be33f77af6c2",
          "latencyMicros": 26,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        }
      ]
    },
    {
      "batchIndex": 3,
      "startIndex": 3000,
      "endIndex": 3999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "MISSING_SUBJECT": 1000
      },
      "batchMerkleRoot": "58aff57455cbd7901128e8c6cc7bcc6c86906596f5509b98bd2c016c240a6f7c",
      "durationMs": 58,
      "avgLatencyMicros": 44,
      "p50LatencyMicros": 37,
      "p95LatencyMicros": 67,
      "p99LatencyMicros": 174,
      "maxLatencyMicros": 1907,
      "samples": [
        {
          "index": 3000,
          "testId": "req_spoof_3000_60760f",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "0961edec32dd619a37af6ab010c9c03e7d36fe27ec096b879f7edd02a61a5d9c",
          "receiptSignature": "0f414c9c68235d11a968375d11790d6d8d5e273966134923a70837498c81678c",
          "latencyMicros": 59,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 3001,
          "testId": "req_spoof_3001_32f2de",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_ghost_4974227",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "5db8ff920318f19836b0d0af419c896baace28b6dfe340d6cf5dc2a0ca1a2014",
          "receiptSignature": "b8f9428cb81487ef9c2686cbff577888ce488f1847c0284d528f4d41f3a3ea62",
          "latencyMicros": 48,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 3002,
          "testId": "req_spoof_3002_9b6284",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_ghost_5966294",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "5f56708b63e5aed176328dd767ef9556f863d6eb70a78a39c9561bc3bc461c72",
          "receiptSignature": "0c141f4b1c4706af35b2b35ed529f19c437b0f8ec2934f4dd065df8147a7cff0",
          "latencyMicros": 47,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 3003,
          "testId": "req_spoof_3003_62b2cf",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "24b5f0cb37f07843e20b3e3b13813b00014dc372170a2b862c7a5bc67f28a04a",
          "receiptSignature": "6a4978ef543f741c9512abe6e5a04c47a095297222b935d9932297cb906b4147",
          "latencyMicros": 45,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 3004,
          "testId": "req_spoof_3004_653e1e",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_shadow_3004",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "8f3c5bb12c168f05e1ca4a500d6ded65fda48509181d9170eb3877ccee1919a0",
          "receiptSignature": "ea9b7e7339eecd612953454aec6f04d93eb8a39bf9c9420afb49562fd608d29b",
          "latencyMicros": 42,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 3999,
          "testId": "req_spoof_3999_fa6add",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_ghost_2423580",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "d00f8b3d166f84cdfd98513ebe689008ee5900e63772510e59fb6ead1479395f",
          "receiptSignature": "1140101a5c3b4d2b348e3adb7f24f717cd55f1663fa2feffedbb45cf0569c22c",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        }
      ]
    },
    {
      "batchIndex": 4,
      "startIndex": 4000,
      "endIndex": 4999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "MISSING_SUBJECT": 1000
      },
      "batchMerkleRoot": "817aeba5fef099b43ef87e96f9558d0025d2b85102d4962d59d060f507392e13",
      "durationMs": 39,
      "avgLatencyMicros": 29,
      "p50LatencyMicros": 25,
      "p95LatencyMicros": 34,
      "p99LatencyMicros": 54,
      "maxLatencyMicros": 1142,
      "samples": [
        {
          "index": 4000,
          "testId": "req_spoof_4000_bc9a5b",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_shadow_4000",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "74046feae61e841ffe43381a568657b9183d7206be91b2829db5f40fc27acf63",
          "receiptSignature": "feb7720b8980c42b972b2fe54181b03010ee8f1539493f1dbb0c00095b0d7d6b",
          "latencyMicros": 51,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 4001,
          "testId": "req_spoof_4001_acad9b",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_ghost_7259311",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "e346629b81c4ad9c7cc8b724d7ca6eecf3cda27c2db3ddb23ae742a8ea6c7b6d",
          "receiptSignature": "e5a5c072ad0e5e98360f7cb0094c25281efe823637a99dbc5ed517916855651a",
          "latencyMicros": 30,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 4002,
          "testId": "req_spoof_4002_54987b",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "0d649cffd7f29cea462abeb4b086b2fdb86fc837b8ad5bdf9c0c1d77409b4dd0",
          "receiptSignature": "7bfce9dcd164568bbcef3c036a67b3d5e0897b6b9e0186bb6f66ff6df6027ee3",
          "latencyMicros": 26,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 4003,
          "testId": "req_spoof_4003_300fc2",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_ghost_143468",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "8f32d49d42b8cd2f6841196d3efe07f408ed9ace7a59a5d3de40ae533f479ad0",
          "receiptSignature": "84a16f1e044db00f7fd50c824d1eef854d7964c8cfef0bef537b0e78bf17bcd6",
          "latencyMicros": 25,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 4004,
          "testId": "req_spoof_4004_3203a2",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "DROP_TABLE_ATOMS_4004",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "82e10a4c82ce4ae37d24ffafcb7f74ade522e7077163fb829a3f1744a7aaa56c",
          "receiptSignature": "c0e4e9becbf1bc89515f575a5abcd8b5281b7a2a41af44c8e831b8dee0509a27",
          "latencyMicros": 26,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 4999,
          "testId": "req_spoof_4999_78f348",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_shadow_4999",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "e675bf7c8990870307a95f0afcb94fc9c15aa1cda7bd6259deea5c1c6e90b282",
          "receiptSignature": "04101d6d99697261626a18b52f4e258f09bf91a041e95ba4e6c6ab79f47e706e",
          "latencyMicros": 28,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        }
      ]
    },
    {
      "batchIndex": 5,
      "startIndex": 5000,
      "endIndex": 5999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "MISSING_SUBJECT": 1000
      },
      "batchMerkleRoot": "b09291a5014203314abc41c772528a4c546971adb08ffccb31ae9928858135e7",
      "durationMs": 39,
      "avgLatencyMicros": 28,
      "p50LatencyMicros": 25,
      "p95LatencyMicros": 34,
      "p99LatencyMicros": 55,
      "maxLatencyMicros": 1184,
      "samples": [
        {
          "index": 5000,
          "testId": "req_spoof_5000_c36768",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_null_\u0000_5000",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "193015e68f1a883e967d64be42bf40eba0fba43335f74aad3621c0c9a04a9daa",
          "receiptSignature": "112e2e6fa7326fe22c89663ffc4c20e8cd25b5bd5a853c1cbd6eadc289d67c60",
          "latencyMicros": 55,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 5001,
          "testId": "req_spoof_5001_622ace",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_shadow_5001",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "ba98fd4245992605082b306327175364ddacd2cde78c3d9a0701c3fc18dc1b89",
          "receiptSignature": "31217a1e3a2f95b33d041a2826e16f16203107192b34dd3a82e027cc96363a50",
          "latencyMicros": 32,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 5002,
          "testId": "req_spoof_5002_29a4a4",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "DROP_TABLE_ATOMS_5002",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "e1797199ad452e52ade3c8c67ec4fc70dd8d2ed930ef91e6994128af73ad2318",
          "receiptSignature": "099a382ea277995ddf531f3107f819c651d5b0cf74a1c13a2295a9db460b9294",
          "latencyMicros": 34,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 5003,
          "testId": "req_spoof_5003_4836c5",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_null_\u0000_5003",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "bcd6b0946587b855faf0a05d8d025520c5f68c33c98ab7ab6cf5607faacb1e8a",
          "receiptSignature": "53f62f8903e190f48923aeb5978ccc166cecf4c24e42315fb4f487f3d1ba8118",
          "latencyMicros": 45,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 5004,
          "testId": "req_spoof_5004_f44d1b",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_phantom_8c238dd1",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "6c68e7498341811758c19a5a741080973283be1253211374980f9f4146fd0011",
          "receiptSignature": "17791eb73ebb51eda451315cce44ca34763d2ce6ea560aa672ae4e9be0d97960",
          "latencyMicros": 33,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 5999,
          "testId": "req_spoof_5999_b5a67c",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "DROP_TABLE_ATOMS_5999",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "84405382132947a4e99341fc2c1f525b2597b142c8eb7b66071de90b0071c4ff",
          "receiptSignature": "de194f5eaa7c6b32c75d2fc26aeba84b332ac9dd4c67bd127423f4576cc69fc6",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        }
      ]
    },
    {
      "batchIndex": 6,
      "startIndex": 6000,
      "endIndex": 6999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "MISSING_SUBJECT": 1000
      },
      "batchMerkleRoot": "82cbde1d4dae6424ba7ac9916ce87ae520c90dd33ad293a07b39c3ef0ac98d3f",
      "durationMs": 48,
      "avgLatencyMicros": 35,
      "p50LatencyMicros": 26,
      "p95LatencyMicros": 43,
      "p99LatencyMicros": 112,
      "maxLatencyMicros": 1925,
      "samples": [
        {
          "index": 6000,
          "testId": "req_spoof_6000_cefda3",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_phantom_71f9ead4",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "69920e65228cff46ad082497348c4adc6c68220a4e2aafbfe4b5075a222336ab",
          "receiptSignature": "0a2869f857324dedfd0322b70371242f2287d1ebfb257d07dbebf49fb4dc4ed3",
          "latencyMicros": 59,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 6001,
          "testId": "req_spoof_6001_f369bd",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "../../etc/passwd_8e8f",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "80b855a7379c898887019cb30d3ed06cab1717ab80429bf3029de143edd64f2a",
          "receiptSignature": "d2d893af4bccb493de909efbe6c13c58d45b8e108875b77fe9972777150cf4b1",
          "latencyMicros": 31,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 6002,
          "testId": "req_spoof_6002_9311e5",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "../../etc/passwd_d460",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "8a6ad90f9f81b608d875cf38c89cad02365e496e9472cdaa8f671ea928cca050",
          "receiptSignature": "cd829992a6aaf55f3ca99ef7a86b9dab3d48d2bf15e47f5d58626d918c7eae73",
          "latencyMicros": 28,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 6003,
          "testId": "req_spoof_6003_7410d3",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "DROP_TABLE_ATOMS_6003",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "65b914f33fe7fc7df6acf4d9fbf4f8d20cffe6ded15926560a5bcfc895f01bce",
          "receiptSignature": "9cc1703173fdde00bf20dc61530272bd8d195418e63d9b82b21b684186051843",
          "latencyMicros": 29,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 6004,
          "testId": "req_spoof_6004_53b3cf",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_phantom_2fac93d1",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "f80a060b4436c1beec49c3b7aac2b7d38e1801ad0b000cd075564b067f801924",
          "receiptSignature": "0c1bfb5de7b413e7fd5d15a045b5093b66fea3b1a3b38f3650e08ade91f1ad41",
          "latencyMicros": 26,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 6999,
          "testId": "req_spoof_6999_84ee1f",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "DROP_TABLE_ATOMS_6999",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "c6f0056979b0f1033e8e4b88cc72ac8dc6dcf9b293aed7ecb5920023ceab4d4f",
          "receiptSignature": "f6fc59379356fbbf17e12b012481b61baf4b18c0497a888592dd9e59b82969d7",
          "latencyMicros": 25,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        }
      ]
    },
    {
      "batchIndex": 7,
      "startIndex": 7000,
      "endIndex": 7999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "MISSING_SUBJECT": 500,
        "INVALID_AUTHORITY_JUMP": 500,
        "INSUFFICIENT_EVIDENCE": 368
      },
      "batchMerkleRoot": "0e596aceccdaba81afeb989472c314fd2f890b5c9360e221688abb7885429a59",
      "durationMs": 42,
      "avgLatencyMicros": 28,
      "p50LatencyMicros": 24,
      "p95LatencyMicros": 40,
      "p99LatencyMicros": 83,
      "maxLatencyMicros": 1449,
      "samples": [
        {
          "index": 7000,
          "testId": "req_spoof_7000_dba393",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "d64c4488502a41d2d9374fb2c8e68a87891193776130e655af9704a492ad035b",
          "receiptSignature": "a00de83799371f103aea6386c9b7a3e51e4f42940610bfec20b7cbd08826a775",
          "latencyMicros": 42,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 7001,
          "testId": "req_spoof_7001_e9d743",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "b70c6a9a047b6ca762702a75e2a76d049bcef346208cb3e41082d6c3d5c8a4dd",
          "receiptSignature": "55a7156f0641a305edac197ac048f3b1396e7ca00b219335fb729a97175a4ffb",
          "latencyMicros": 27,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 7002,
          "testId": "req_spoof_7002_aa7447",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "../../etc/passwd_f6ad",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "2996f43c28a8fe2903c20b4a6c3009134aa9a8b0bb82680892fbf2943c403fa5",
          "receiptSignature": "8a7271d569f7b07491d3e043451af27e3458cfb5dc7f58223553e390607ab109",
          "latencyMicros": 31,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 7003,
          "testId": "req_spoof_7003_d61e09",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "atom_phantom_df71636d",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "209618784ff8934a2ccedcdc7a52625862a158c0e00d1998600f8c85198bd697",
          "receiptSignature": "bc07d50d9d3049f56b70bcb6fc9a5bd4ad2c5068987805f12f966e0bbc88382e",
          "latencyMicros": 27,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 7004,
          "testId": "req_spoof_7004_9814ed",
          "category": "IDENTITY_SPOOFING",
          "subjectId": "DROP_TABLE_ATOMS_7004",
          "requestedClass": "FACTUAL",
          "requesterId": "ATTACKER_SHADOW",
          "decision": "Denied",
          "violations": [
            "MISSING_SUBJECT"
          ],
          "canonicalHash": "df996e255d43564cf0a51dd543840fb3e4f6f6bfcc38ab965bc8a0afc2d88066",
          "receiptSignature": "2ed7be31544d73fee2c30a0ee13638f8f7c9be95c30c098a8b222025bda26f23",
          "latencyMicros": 26,
          "explanation": "Boundary checks failed with violations: MISSING_SUBJECT"
        },
        {
          "index": 7999,
          "testId": "req_tamper_7999_be5f42",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "2e0b53a244d7e4b8533d0fd8562dba895a807b43464c1e00a367e4d4fe4350d0",
          "receiptSignature": "e7f641782ae761ad390d7403ac45e43c54ac64455d4eac65c1554cfa15e11417",
          "latencyMicros": 31,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        }
      ]
    },
    {
      "batchIndex": 8,
      "startIndex": 8000,
      "endIndex": 8999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "INVALID_AUTHORITY_JUMP": 1000,
        "INSUFFICIENT_EVIDENCE": 737
      },
      "batchMerkleRoot": "85f04cbf196b01a8dc60dfbcc0d60fefd035af78dbdb03b7faab94fd0645ebab",
      "durationMs": 38,
      "avgLatencyMicros": 27,
      "p50LatencyMicros": 24,
      "p95LatencyMicros": 34,
      "p99LatencyMicros": 67,
      "maxLatencyMicros": 1159,
      "samples": [
        {
          "index": 8000,
          "testId": "req_tamper_8000_a6b366",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "3d647bddf44392ad736126a73f20db0586b015313b86400cff51f74864b5a77e",
          "receiptSignature": "5769d21e05f75a11a157d4b2f75dceb51f7d497306186bf3d464447e0c1affaf",
          "latencyMicros": 47,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 8001,
          "testId": "req_tamper_8001_971cba",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "e7a6cfef5079505b91636a98640ccad7c0adca50491326714d7ab73d9d534995",
          "receiptSignature": "0ba9de2653752ce83cfa137b2e35ee261eecb755308c53fb36087d40cf7a20e1",
          "latencyMicros": 27,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 8002,
          "testId": "req_tamper_8002_714af8",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "fa19f064655ad3dabbb8bdf96fe10da66a2a9fa08ce08bcbea8cd2e4236d08ee",
          "receiptSignature": "a63534c941c794af076cab57a2f024e74f9860066514672a4b2322bfc91c4896",
          "latencyMicros": 25,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 8003,
          "testId": "req_tamper_8003_e1b8e2",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "6b6b71e0338a5ccfa370dc1065fea99fab601d5c19d99e3a99d87820c23bb547",
          "receiptSignature": "cde78b87e902df55a04ec3344c0f24fd10f17dabf3c9dfa56809d786b3246f86",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 8004,
          "testId": "req_tamper_8004_fc706b",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "2a87b33d75bc7f58ca655573a6f31753df829adee59bead9057c0f244ab7b121",
          "receiptSignature": "d2b74011b7372439e831218189d81a9004cddaae4366b158cb68ea94c9b8cd7c",
          "latencyMicros": 25,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 8999,
          "testId": "req_tamper_8999_c2e028",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP"
          ],
          "canonicalHash": "ad571ebd273d9c8ecbff5769806b7948db34ba845adc78fa50de574e9cfc1f8a",
          "receiptSignature": "181cce05675285f7725a973054c869defc363a2999ff4aa5ff8673c837aa3744",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP"
        }
      ]
    },
    {
      "batchIndex": 9,
      "startIndex": 9000,
      "endIndex": 9999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "INVALID_AUTHORITY_JUMP": 1000,
        "INSUFFICIENT_EVIDENCE": 742
      },
      "batchMerkleRoot": "cfc4d51e231eb9cd62cbca569b3876c771877a0220a22d8687601e409af5e56d",
      "durationMs": 37,
      "avgLatencyMicros": 27,
      "p50LatencyMicros": 24,
      "p95LatencyMicros": 34,
      "p99LatencyMicros": 81,
      "maxLatencyMicros": 1235,
      "samples": [
        {
          "index": 9000,
          "testId": "req_tamper_9000_fc0e34",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "886d96f9327e488ff8f943dfed564f60a13692475888b4eed720afc27dad9bb8",
          "receiptSignature": "d9833f3c4941c53a17c191b44c028ba00024f98356d8707cbde01234168ac4e6",
          "latencyMicros": 36,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 9001,
          "testId": "req_tamper_9001_ce362d",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP"
          ],
          "canonicalHash": "7d9894bdf60ff99540c0b7b3842db6d93f49cb7c9049a160d9139a9e4ebc92b9",
          "receiptSignature": "c579a59fbaea7a247f8f53906d1d1a5cf1a38cd6ad68e1e618abd95e3d747d5b",
          "latencyMicros": 30,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP"
        },
        {
          "index": 9002,
          "testId": "req_tamper_9002_5fffae",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "ff75f3c0a0fbd8ce01f95f05e6da1cb43b58ba0593971fb69ecbb643c090092d",
          "receiptSignature": "a68b5333826df5135c1b27f1986eb407ad6f873984433376c60508792239dd62",
          "latencyMicros": 27,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 9003,
          "testId": "req_tamper_9003_2f97b8",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "88e87387b0016940490a1b9b8ad13112ded83c6c2b21967174c73b65e251dcf3",
          "receiptSignature": "91b05a8c37e5dbb6a5828efd94622cee4b4f8ab3744e248b9fbce75d1f2a54c8",
          "latencyMicros": 21,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 9004,
          "testId": "req_tamper_9004_d384f3",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "465a3b196abebbb65351d20837f0924abc29413f0e7057c8d2ad572adcf8ed9c",
          "receiptSignature": "d1775b5af458f2965359ca6dbd3ef512a16fd29acef9ea48307339a181402d2e",
          "latencyMicros": 21,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 9999,
          "testId": "req_tamper_9999_844d02",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "0257aacd97bede1388ec6ca690fff97a153f934fdc1638ac15cbfaab6bf83373",
          "receiptSignature": "143faf4ef82f7edd82efcfff771cd044f57f8b63e4ae8c82547e6251597fcfe7",
          "latencyMicros": 19,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        }
      ]
    },
    {
      "batchIndex": 10,
      "startIndex": 10000,
      "endIndex": 10999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "INVALID_AUTHORITY_JUMP": 1000,
        "INSUFFICIENT_EVIDENCE": 748
      },
      "batchMerkleRoot": "e042fc0f6366f44cd3c6ff2355e6d73ba859fb692271017f5b9d6952b6955d01",
      "durationMs": 49,
      "avgLatencyMicros": 31,
      "p50LatencyMicros": 25,
      "p95LatencyMicros": 52,
      "p99LatencyMicros": 110,
      "maxLatencyMicros": 478,
      "samples": [
        {
          "index": 10000,
          "testId": "req_tamper_10000_defd92",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP"
          ],
          "canonicalHash": "255a26115999bf5f560c64c342b5a926d9c3eb4abeba797ed980c71e8a964f15",
          "receiptSignature": "9a6625ca15eb64dc3c91c3729c289049d3f806b1bdfd659b23891967ef47f739",
          "latencyMicros": 41,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP"
        },
        {
          "index": 10001,
          "testId": "req_tamper_10001_37aeef",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "1de6e6cc325fd3e3a3fb496b0255f07018788e14f010cd3e7fccb4fcbe7734fc",
          "receiptSignature": "096428db58e021c7236dd7455e3ebb794cd0fec5f60e74d6c9a292c6964bf4f0",
          "latencyMicros": 25,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 10002,
          "testId": "req_tamper_10002_8ea082",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "e4c35f65de331690dfdbb602c4f2eec0289aaeea3abb7a6be6cc287937bdec7f",
          "receiptSignature": "3643b7633b661d801a02f403dd13db3f86678296222c19a88a34574a1f3bfbb8",
          "latencyMicros": 23,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 10003,
          "testId": "req_tamper_10003_1a5db4",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP"
          ],
          "canonicalHash": "eb6efd73760ffd9ed07d1cb238a06f0b134da379417b94e5fc08504197592a81",
          "receiptSignature": "c839e7cdaec9011fd0634be1cab119770adccab7a26287c7de49c23009b994b1",
          "latencyMicros": 26,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP"
        },
        {
          "index": 10004,
          "testId": "req_tamper_10004_a99748",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP"
          ],
          "canonicalHash": "ad77fa33202401cab8d2596e5039dbcc4c7a7b79b5a64a855ae9989d9d1d5b7a",
          "receiptSignature": "76332c14b755cc263dc192611645656a663ca931e0c56bea27bb20921ef63f00",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP"
        },
        {
          "index": 10999,
          "testId": "req_tamper_10999_db4e37",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "e5ac52dc555fd61289efc6632e85331f12630f6155b902c2cebf13b0dd63d3d7",
          "receiptSignature": "a85ec31295149496d17a733bea2313fc39be2b4d71b03128d299ab2b191e1a18",
          "latencyMicros": 31,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        }
      ]
    },
    {
      "batchIndex": 11,
      "startIndex": 11000,
      "endIndex": 11999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "INVALID_AUTHORITY_JUMP": 1000,
        "INSUFFICIENT_EVIDENCE": 752
      },
      "batchMerkleRoot": "2b0b3347c76a2a9cf6d0d98ad87668f2eb274fc50e0d46444eaf677165cc5cca",
      "durationMs": 58,
      "avgLatencyMicros": 41,
      "p50LatencyMicros": 23,
      "p95LatencyMicros": 44,
      "p99LatencyMicros": 66,
      "maxLatencyMicros": 9665,
      "samples": [
        {
          "index": 11000,
          "testId": "req_tamper_11000_c2d563",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP"
          ],
          "canonicalHash": "17611fa1fe1132ec3957bbd0dcfc34df0a7177fed34a24009bb405dd287d66c0",
          "receiptSignature": "6da501e813116f0bf6119551e6425f5b9ca5997ef119779ed8111cdd323f52c5",
          "latencyMicros": 66,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP"
        },
        {
          "index": 11001,
          "testId": "req_tamper_11001_70a4fe",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "31b3765d0dfc2586253e452e395e442dd7cbe2edc5ac62ef6371d9fd2b9f4e17",
          "receiptSignature": "bbc219b2aa2be7e75816ff4257d0660aa83420e6c6ecc65efb9f0fda9fa042f1",
          "latencyMicros": 39,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 11002,
          "testId": "req_tamper_11002_e08f9b",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP"
          ],
          "canonicalHash": "db2f886a9e011e78c61fb6330ff5cee434721cb9009ed467373af62d89b2d005",
          "receiptSignature": "54290486ff4f37315d1f728317357f2c22a8b96e3340d108319119c4d8da345e",
          "latencyMicros": 44,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP"
        },
        {
          "index": 11003,
          "testId": "req_tamper_11003_96b10f",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "d9e109508510b0b4c54558fe0046df720757ace3898493a786a9227d36f8242d",
          "receiptSignature": "e61e38003ab8f93f520c174ff4232b80843070d4fef57c13ca78dbd3030f4236",
          "latencyMicros": 42,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 11004,
          "testId": "req_tamper_11004_9b622e",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "4e794d4749ccad550c2c1d5606585f9e271e63085a02f1252f3ec903547ebf24",
          "receiptSignature": "41c8c3294f8ea976953a1a32db9b35f6e0bf6360adee86f08333031000d39fea",
          "latencyMicros": 40,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 11999,
          "testId": "req_tamper_11999_550b67",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "ede466669b171d9d34a0f066d283955a111f5ecbf0df38735ceaba45e227a8b2",
          "receiptSignature": "63d1fcc51d71a0bfcf4011299c970167a67e1f11801b519bc0477945b6d3cf0c",
          "latencyMicros": 384,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        }
      ]
    },
    {
      "batchIndex": 12,
      "startIndex": 12000,
      "endIndex": 12999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "INVALID_AUTHORITY_JUMP": 1000,
        "INSUFFICIENT_EVIDENCE": 744
      },
      "batchMerkleRoot": "5fff184099a487df7d4a8b6451f8aa166ae41fab0ad4f979b302595d3d1a7613",
      "durationMs": 46,
      "avgLatencyMicros": 31,
      "p50LatencyMicros": 25,
      "p95LatencyMicros": 47,
      "p99LatencyMicros": 96,
      "maxLatencyMicros": 1429,
      "samples": [
        {
          "index": 12000,
          "testId": "req_tamper_12000_1eb448",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "e58330ab249209e80901c2fc229cad7df34954f5284c02affa2d33f41534e632",
          "receiptSignature": "9a006d01aa1eb89920cffc38e9ac9b79094ee980149e251c67e44a76a0a7925b",
          "latencyMicros": 55,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 12001,
          "testId": "req_tamper_12001_1c6d13",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "131357f04b22f28381896b46dfa346ed953e469b05b2d52fe3026d9b51c8cdcd",
          "receiptSignature": "668838d6e9e4e9fb463d588dbe538ee9900b5124f230b7038337a93ace69f97f",
          "latencyMicros": 28,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 12002,
          "testId": "req_tamper_12002_0db491",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP"
          ],
          "canonicalHash": "9dd8d3e48c9b59ac0279fd39567d6767632f286312434ca5a273246fa045c662",
          "receiptSignature": "3eec5a453a9df23e049577d59020b2be8ba20167855e639b085e68fc2932852e",
          "latencyMicros": 25,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP"
        },
        {
          "index": 12003,
          "testId": "req_tamper_12003_5dbc12",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "a0cf5eb593ab474d44cca57f2e3da3fa7171806a0df540dba7a75e64dcade5d4",
          "receiptSignature": "e94cf1f8ea28fde9f4c6333896da3b9fbed7e80e4b36fa9bfe29a796b7f8a5fc",
          "latencyMicros": 23,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 12004,
          "testId": "req_tamper_12004_90a4af",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "f2bcfaf3f19a9dcbfbd3c07537b64f8668aea30f7be58910a24822b3e84c3a9b",
          "receiptSignature": "45191ec4f445cdcbb3b217cf9c6b4d5574017e5f175a523956c556fc441b9756",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 12999,
          "testId": "req_tamper_12999_cfaf30",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "f343ba2f56b0712838a5765e9556e840a739d9febed07028a1027ef3439fea91",
          "receiptSignature": "3e7c7da20233c1f48d065e77bd5a791633203fedc2aab93ecfd4a47c99d98bd1",
          "latencyMicros": 40,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        }
      ]
    },
    {
      "batchIndex": 13,
      "startIndex": 13000,
      "endIndex": 13999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "INVALID_AUTHORITY_JUMP": 1000,
        "INSUFFICIENT_EVIDENCE": 754
      },
      "batchMerkleRoot": "40d29120902a09c13361a0644214cc3c1e556f8c1fbc3f01c25dbed9ae942529",
      "durationMs": 48,
      "avgLatencyMicros": 34,
      "p50LatencyMicros": 26,
      "p95LatencyMicros": 51,
      "p99LatencyMicros": 160,
      "maxLatencyMicros": 1508,
      "samples": [
        {
          "index": 13000,
          "testId": "req_tamper_13000_533fcf",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "e4ff2144ef9bd38a21b0cbed4916b64bf66a31fb63e92b09de641253255005ab",
          "receiptSignature": "ed6a2ad4ce969f5b08e4cb454b1570c31b03f010e2f61119d9d8a8bb4a29ebc3",
          "latencyMicros": 76,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 13001,
          "testId": "req_tamper_13001_1f6759",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "f1bc0f5c68c3f4a162c5187affe13eb55fa40a31b9f22bb917c8013dc3626df5",
          "receiptSignature": "c7bcd299447ed203328c6d19209d77b845e92b104a8cbe80a1d8af1116ce177f",
          "latencyMicros": 34,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 13002,
          "testId": "req_tamper_13002_733e84",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "4e335a0f67c7284fa5e9cd31c0c7684138ac5d2c47f7c735054ab26d8d2f8305",
          "receiptSignature": "f09662aa32283aef3ddf25b9b3103ba275125b48f28e23c90284f6f77b0f7cf8",
          "latencyMicros": 30,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 13003,
          "testId": "req_tamper_13003_c754f2",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "12776446354548e8c869ce70afb30b098ddfa65b711541c69d6f90ff47f23369",
          "receiptSignature": "50c379fa65f0dfd54346e3916500f0ec5410d3adc4411b8b5e2281e7a1c1dfa7",
          "latencyMicros": 41,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 13004,
          "testId": "req_tamper_13004_7adad9",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "da5ab707932d595c4e0ba2575bee52cdf050e46357578657444a19695abea9f5",
          "receiptSignature": "b1b333c521c5fbde5f66a1d7cf22cca900fa5b50af27443362f998586a49f289",
          "latencyMicros": 45,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 13999,
          "testId": "req_tamper_13999_e8519c",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "09ca0003a944550aff806ce4c2d6e205c7c15c9b37538391ba4e0db91ef76c03",
          "receiptSignature": "caeff58b46da8eaf7426e92fb06efa6942bb696a9746eabec2269b950b3f55e0",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        }
      ]
    },
    {
      "batchIndex": 14,
      "startIndex": 14000,
      "endIndex": 14999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "INVALID_AUTHORITY_JUMP": 1000,
        "INSUFFICIENT_EVIDENCE": 777
      },
      "batchMerkleRoot": "c14b148c653f2a59cc694b07df139a0fda49cfd9ba7035c772728ec3d1edf972",
      "durationMs": 35,
      "avgLatencyMicros": 26,
      "p50LatencyMicros": 22,
      "p95LatencyMicros": 32,
      "p99LatencyMicros": 57,
      "maxLatencyMicros": 1552,
      "samples": [
        {
          "index": 14000,
          "testId": "req_tamper_14000_102391",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "4992bfeabb55f6074885acf8195ee1139f060acc717c965d4769f34079c3296b",
          "receiptSignature": "aa1cdec2026e84fda32ac4519e5fe99e3934f0d40661b1f14ed50f8fa1c0a1dd",
          "latencyMicros": 39,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 14001,
          "testId": "req_tamper_14001_b4376e",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "25bd9814c734ede4a641e42f1a22172fbcff2964d9b5098a26f4ba3e08712127",
          "receiptSignature": "e55e6c26a28078f1b6b05935e60cfca9a877c874aadea6e4abf3515f9ce2b881",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 14002,
          "testId": "req_tamper_14002_683f19",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "FACTUAL",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "c4830e69536306a803887a2fd4058b40eb79c5d2c6a1b0c03daeb10cb3e7eee9",
          "receiptSignature": "f49d53e43be7d7a6e5009f2bde5c71b979491b3e14bc17b35a85eb1cf1f35d7f",
          "latencyMicros": 25,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 14003,
          "testId": "req_tamper_14003_d6ed5c",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "1e2b1a4b75c148ef433945dab34e474ebbcbb2559a438dda87bd7b245e0a53ae",
          "receiptSignature": "b9d8b5f49c214c98299ebd3e0f2829137e66a85cfc6d459968dd44eae02a1b72",
          "latencyMicros": 20,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 14004,
          "testId": "req_tamper_14004_c7d65b",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "2efc60dc7569210767855188db807358aecadd201e46289ea2c8bfe6c00628a9",
          "receiptSignature": "ecb40d8d3994c58385ec48ffe9bc585d2713d8bdf57a24a2748406459d685b17",
          "latencyMicros": 19,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 14999,
          "testId": "req_tamper_14999_7dbd46",
          "category": "EVIDENCE_TAMPERING",
          "subjectId": "atom-hypo-004",
          "requestedClass": "ENTERPRISE",
          "requesterId": "AGENT_TAMPERER",
          "decision": "Denied",
          "violations": [
            "INVALID_AUTHORITY_JUMP",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "661ecd71e357eba0a33110d94d2cb2f0714cdfce251d7c3b5e802582c914b016",
          "receiptSignature": "ce00691771b5cbb7ff3d2838cba1fd46881661c79325e16d638a30cbcf06bc08",
          "latencyMicros": 18,
          "explanation": "Boundary checks failed with violations: INVALID_AUTHORITY_JUMP, INSUFFICIENT_EVIDENCE"
        }
      ]
    },
    {
      "batchIndex": 15,
      "startIndex": 15000,
      "endIndex": 15999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "REPLAY_CONFLICT": 1000,
        "UNAUTHORIZED_REQUESTER": 1000,
        "INSUFFICIENT_EVIDENCE": 1000
      },
      "batchMerkleRoot": "8fe4e1f762d6ff72334a3f01cf818e92b385c55ad5d1c2afda935b01ab6f9ad5",
      "durationMs": 47,
      "avgLatencyMicros": 34,
      "p50LatencyMicros": 19,
      "p95LatencyMicros": 32,
      "p99LatencyMicros": 64,
      "maxLatencyMicros": 10001,
      "samples": [
        {
          "index": 15000,
          "testId": "req_poison_replay_15000_bbf4",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "0cd6965559524a2ce1f73c08d7e67ca75c632324dd0316e28c0a089828f6d1a8",
          "receiptSignature": "36c424c1a7405e45dbdbc63f1deb38f52a583b574992dce265ede574cc0e5740",
          "latencyMicros": 139,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 15001,
          "testId": "req_poison_replay_15001_7abc",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "a620b7fc5bdc5961f5b299f7eb83ff7247a2bb1a4d5c07e389d1f7b6f1592a8a",
          "receiptSignature": "c2876414ef92feaa2cf52450a87ca0ac99c26be6dd064c532d58b389b1f4d647",
          "latencyMicros": 37,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 15002,
          "testId": "req_poison_replay_15002_f9e5",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "1d31fc81ad520373b0b47846d2ff30c4dd7574c3a7d4358f709c22753bff6f2d",
          "receiptSignature": "aebb67d3388a4a710e9fb87d86438f5b9ca4e4854c32d739a61fc624afccf3ad",
          "latencyMicros": 23,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 15003,
          "testId": "req_poison_replay_15003_dcbc",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "4144f286c9f388ece33b1efe51214b1486d7e634b4c0317171c49b199d2f94fe",
          "receiptSignature": "3b40876e09aefa5eb65b9011a49310c5be0e99d74808ea6a1044058389a62083",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 15004,
          "testId": "req_poison_replay_15004_cb6e",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "825b17f6eadc448132aaec4f40d49bda382cbb0ee12ad7a18ab9092efb79950a",
          "receiptSignature": "099f14c7e42eba44fd193d8fdaf36ac0329439412cd7fbcc5bc19b8effa2491b",
          "latencyMicros": 21,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 15999,
          "testId": "req_poison_replay_15999_d68e",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "f017f1dbdf1bc2b681121f48ccb0053cbccc06283eb3a41e7e48fdfb78645d9d",
          "receiptSignature": "00b6801b5a73a0757ff5da5714cd28077c2584be18486622ae242c36219cdad4",
          "latencyMicros": 18,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        }
      ]
    },
    {
      "batchIndex": 16,
      "startIndex": 16000,
      "endIndex": 16999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "REPLAY_CONFLICT": 1000,
        "UNAUTHORIZED_REQUESTER": 1000,
        "INSUFFICIENT_EVIDENCE": 1000
      },
      "batchMerkleRoot": "44bc08ac6ee972b7b8ec528e0dc8e352fb7fb565eb7831d3b3dbda195106135e",
      "durationMs": 34,
      "avgLatencyMicros": 24,
      "p50LatencyMicros": 20,
      "p95LatencyMicros": 29,
      "p99LatencyMicros": 65,
      "maxLatencyMicros": 2268,
      "samples": [
        {
          "index": 16000,
          "testId": "req_poison_replay_16000_36ab",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "b76e2740361b034bfbf5c0a96520e36bc0ed27d187e58684184b3713e18975c1",
          "receiptSignature": "c9e94f0853a8dad8c9f15b3a09cd1b9caee809f35ea6769a8f6c9e804d382fb7",
          "latencyMicros": 31,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 16001,
          "testId": "req_poison_replay_16001_ae93",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "fb41adc04cd0444af6d7c98df9dd25a1fc1f65e47d16d2f1cb947eca36b05072",
          "receiptSignature": "3d861b2e96cb4239292c29314183a59f719d72bd5844161ca84d67e0e17b3b78",
          "latencyMicros": 21,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 16002,
          "testId": "req_poison_replay_16002_fc94",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "5ea1540e98e07ba8939d63eea3acc0d90e5f6f7d4cb7930c1e36a772b5de4190",
          "receiptSignature": "3296f2af5c6d06b24ca958bf6f77e12bbef15a81e597117452e7a7f7c7c7f976",
          "latencyMicros": 19,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 16003,
          "testId": "req_poison_replay_16003_6a30",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "e723ad85c713bcf7094dab215e992e1bc5f84dd935290ab22f130b1d43d98551",
          "receiptSignature": "387481a57cf645d6255e6ecf64bc7d5ef661855ace6c8d87ead32bc35b78b2f1",
          "latencyMicros": 18,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 16004,
          "testId": "req_poison_replay_16004_8ce9",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "5c54d67e396be0a93e48d6d8603f86a691e14daf90acf1b0db0128e51e6c57db",
          "receiptSignature": "a8694c480d48aa9fb40f13e2a32cbea834a59f682b9073f4d1741170e1b425ab",
          "latencyMicros": 19,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 16999,
          "testId": "req_poison_replay_16999_edde",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "19ca9a103e694a2b9da403ef506b2fb109abcef488dfd0cb2e3c4eaba722dcee",
          "receiptSignature": "b51f27a588ca5b40fa483e567ac2654e564b41f5f144a4abaf866979e948d359",
          "latencyMicros": 20,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        }
      ]
    },
    {
      "batchIndex": 17,
      "startIndex": 17000,
      "endIndex": 17999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "REPLAY_CONFLICT": 1000,
        "UNAUTHORIZED_REQUESTER": 1000,
        "INSUFFICIENT_EVIDENCE": 1000
      },
      "batchMerkleRoot": "9711d74b39efcbd54aee29bb5a2e169ccee050155f60cbd9638e7a9440c23d81",
      "durationMs": 32,
      "avgLatencyMicros": 22,
      "p50LatencyMicros": 20,
      "p95LatencyMicros": 29,
      "p99LatencyMicros": 40,
      "maxLatencyMicros": 1007,
      "samples": [
        {
          "index": 17000,
          "testId": "req_poison_replay_17000_1403",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "adc2e84764b4bdf6f2e4fcaf39ed2d7c3e3263cb3a52b9bf17ea71ef3b5d0ee8",
          "receiptSignature": "09c7c1fc7548980a18523bca868ef913608cbc8f8d66eacf9e58cfd64ea5eca9",
          "latencyMicros": 40,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 17001,
          "testId": "req_poison_replay_17001_7702",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "1766786f43aadcfd1811cc907a5acd2973b26410e6c0291b2de07193fb76f976",
          "receiptSignature": "b1b38a906333872afdefe49b6ecc2a40f654c416f99ffde10b2b67328c50fdce",
          "latencyMicros": 23,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 17002,
          "testId": "req_poison_replay_17002_6a8a",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "5717cc6a8a63f91aae8014bbc87c0ab61cb1465651c9f182233b546678b0d674",
          "receiptSignature": "c0589d32408d17dad2a473076dc10aab676d36f1a752d69ef6535aea46734384",
          "latencyMicros": 20,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 17003,
          "testId": "req_poison_replay_17003_c69e",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "904165941acf543ec6e17e0de0461348d5da3b506c8df748bcf47a1340dba5d6",
          "receiptSignature": "2d508736f5ddc31f8bf10c881e09b1a87226595d6d4d0218460298c4de9f43a8",
          "latencyMicros": 23,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 17004,
          "testId": "req_poison_replay_17004_6fcf",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "d9aafc75f45443f1f54f39e6837643c143bb5bf00a4945d04c9a2db10f5c3a15",
          "receiptSignature": "6003c3276c13aab5b1310fb6677d0ba1340d54037fdc5e578a12d52deb9899a4",
          "latencyMicros": 19,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 17999,
          "testId": "req_poison_replay_17999_e145",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "34860a67ef4c3e9facba274178cd1b87ba10f08b729a89e165d6d0cf546aad91",
          "receiptSignature": "d8a92d25277953880ae389aecacc61b8614a9b2ed8a4cbdc2a32e762ffb9a1fe",
          "latencyMicros": 18,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        }
      ]
    },
    {
      "batchIndex": 18,
      "startIndex": 18000,
      "endIndex": 18999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "REPLAY_CONFLICT": 1000,
        "UNAUTHORIZED_REQUESTER": 1000,
        "INSUFFICIENT_EVIDENCE": 1000
      },
      "batchMerkleRoot": "35583596d7a8d9f744804539a7094a595daa854d700dea8384ccabb7d963ab08",
      "durationMs": 32,
      "avgLatencyMicros": 22,
      "p50LatencyMicros": 19,
      "p95LatencyMicros": 27,
      "p99LatencyMicros": 45,
      "maxLatencyMicros": 841,
      "samples": [
        {
          "index": 18000,
          "testId": "req_poison_replay_18000_f6b3",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "5a05465b9cc3767e26c55f05e2d474e7f06cbcdd3d4026c6469993c9feccea6d",
          "receiptSignature": "5318b3961791adf3e5112677934f926f65f2a7a514fdce82c8ad248b57c10bcf",
          "latencyMicros": 74,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 18001,
          "testId": "req_poison_replay_18001_a82d",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "284a03fed8f728a3b3007da184bf8856f60da00b0915d4db1308d86e4319387e",
          "receiptSignature": "62a78e17bd8b0448a6ea6b17d15abee3a730ce130e02be2c1b4b0da35fc29ff1",
          "latencyMicros": 68,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 18002,
          "testId": "req_poison_replay_18002_0fa4",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "1129d581d12796063dffd815e174deefd5018a32a39e86a129e87f43576d0d6e",
          "receiptSignature": "14adca0f63ad5ad2e0e371759577e01488d2f993ba0150e4c54a5fb0cc8eef69",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 18003,
          "testId": "req_poison_replay_18003_4f70",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "2ce9d67cbc688d67febff1c04d1f3ad51e19cfd26e6332d3834e1020a8a94241",
          "receiptSignature": "c985fce7ed3c38d7cc0faac9c97ac44f0058165c5e7d7e8c66c35389f5e81a2b",
          "latencyMicros": 21,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 18004,
          "testId": "req_poison_replay_18004_7f9f",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "e707e3017cf46791ffbcd264cd6c6b5ef1057fb57b4fd4c2b73f345633b03440",
          "receiptSignature": "268f41c8fd44aeb0c5cb98f88bce96f53983899bd82457e1d260c2fff68150b3",
          "latencyMicros": 20,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 18999,
          "testId": "req_poison_replay_18999_fb21",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "dca36dfc1d59127b628c02856e554813141948886dbaa3b4c0423cd4c694641a",
          "receiptSignature": "7c71edd78d7a2df7557c64ed01796efb0593dc55f594855fa76c4f3ca8023dc2",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        }
      ]
    },
    {
      "batchIndex": 19,
      "startIndex": 19000,
      "endIndex": 19999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "REPLAY_CONFLICT": 1000,
        "UNAUTHORIZED_REQUESTER": 1000,
        "INSUFFICIENT_EVIDENCE": 1000
      },
      "batchMerkleRoot": "4bde4ccadb76b515f3c969a0be076ad891abc0f93db5b252c3b6e2c4a54253c3",
      "durationMs": 31,
      "avgLatencyMicros": 19,
      "p50LatencyMicros": 19,
      "p95LatencyMicros": 21,
      "p99LatencyMicros": 29,
      "maxLatencyMicros": 97,
      "samples": [
        {
          "index": 19000,
          "testId": "req_poison_replay_19000_def8",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "0dc4dd7a103b2852e1d7dea74079ccb11109dbf7f8114856b54e5e03b8bb3ffd",
          "receiptSignature": "42d0edfe607bc88b8451c27100b3170da9080615f67f02192a1857995b3646cd",
          "latencyMicros": 27,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 19001,
          "testId": "req_poison_replay_19001_7916",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "55de81f244d6fdc6c8e01432cce818191ae432df396fd6086e5c1d7c21bedbab",
          "receiptSignature": "387ded8888057f50c091637fd47b4f199fc8baa2aed3024098c2520c881b5950",
          "latencyMicros": 20,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 19002,
          "testId": "req_poison_replay_19002_7b10",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "738bad85ddacc6fd2d829d68466ae890ba2ef7cbb4d7d773b9122f126d55e383",
          "receiptSignature": "bf9209d1fdc3a9739a362fb09317bc962a794573d4a022d8673e2c63f9bed846",
          "latencyMicros": 20,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 19003,
          "testId": "req_poison_replay_19003_8fb4",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "d235ae0e9bed61caf357fa55b01b5a5c755187d0efc8bc3dd1998bdc11802f25",
          "receiptSignature": "a8a38d1c079ec15574e88afba44204e4993f6bff68378df156b763e027db7f09",
          "latencyMicros": 20,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 19004,
          "testId": "req_poison_replay_19004_2753",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "baac2480a952864ce4b0b41e815abf21ee864715c3501bf45dc39ba2d1cd8374",
          "receiptSignature": "988682379f69ec9366122f0c52a454d1ce874be61f80274e37dc040b068b6cb3",
          "latencyMicros": 19,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 19999,
          "testId": "req_poison_replay_19999_6113",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "858aa60264ca1a64c748323bfb65cfcefcf1d58c6e1c65a17fe8cf7ce219bfc6",
          "receiptSignature": "fac78db15eea1a9b29bc3e0dbfd7a57235a6e3c2ce195ffb8512be78419767a0",
          "latencyMicros": 19,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        }
      ]
    },
    {
      "batchIndex": 20,
      "startIndex": 20000,
      "endIndex": 20999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "REPLAY_CONFLICT": 1000,
        "UNAUTHORIZED_REQUESTER": 1000,
        "INSUFFICIENT_EVIDENCE": 1000
      },
      "batchMerkleRoot": "5973ce7c471843147c33c65a52b041b948062059566cf925049e4c47b6294544",
      "durationMs": 29,
      "avgLatencyMicros": 20,
      "p50LatencyMicros": 19,
      "p95LatencyMicros": 25,
      "p99LatencyMicros": 35,
      "maxLatencyMicros": 46,
      "samples": [
        {
          "index": 20000,
          "testId": "req_poison_replay_20000_1b99",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "33f6224c49b25f42338a1fd2cd1bc2a4987f8dcba3f7c041accffdfe162e80c6",
          "receiptSignature": "79048a5f93b40055a80da4e392dafe40a0c0085c6492d04e5c7c337639ac94b6",
          "latencyMicros": 46,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 20001,
          "testId": "req_poison_replay_20001_efaa",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "2439fc9e022118eeab38016e21d7262bcf25b531eae5c821b0ca732ec34ccee4",
          "receiptSignature": "4592e6259ffc49dd3337805901292a998d9c608577d8e9a24c89a3283d6dc068",
          "latencyMicros": 27,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 20002,
          "testId": "req_poison_replay_20002_560d",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "c475f0d58c7a38eba4d285deb911f7ca6eaff4648e7cfe79fe88ef1f49a4f78c",
          "receiptSignature": "6e8667152b66a32cc5182f44899d32dd291d7465a43f04a2c076b94bee4edd99",
          "latencyMicros": 26,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 20003,
          "testId": "req_poison_replay_20003_4b9c",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "bdf1a8796fd8658395f58930ecaa080de98663cd3a7a7e38371c4326c6d6f3ea",
          "receiptSignature": "9603daa721656a65c6cbabcc8ddfe7bc83daa174a3aa29385857a0c1f6b384ee",
          "latencyMicros": 26,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 20004,
          "testId": "req_poison_replay_20004_8fbc",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "f96307cafb14105628bc98db50d292b64d685a5c8a02c23b919dd76a88d41fb6",
          "receiptSignature": "50dab51cc756e7a6ba3a0257a6638ec52d4637d81bba13bcdc66c292fffb9940",
          "latencyMicros": 29,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 20999,
          "testId": "req_poison_replay_20999_f1e2",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "03d7e34f9594e614e173fc791b7932d29e2d04e87262e39b230040d61f44e7f2",
          "receiptSignature": "f6299367b53ab80e9d6b24338aa518a14a6323517ff96771256ffb97eaf74fe3",
          "latencyMicros": 28,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        }
      ]
    },
    {
      "batchIndex": 21,
      "startIndex": 21000,
      "endIndex": 21999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "REPLAY_CONFLICT": 1000,
        "UNAUTHORIZED_REQUESTER": 1000,
        "INSUFFICIENT_EVIDENCE": 1000
      },
      "batchMerkleRoot": "c58744122fa94368825aee8cae991e73e095d8ea6278f01845250401bb9fb4ce",
      "durationMs": 33,
      "avgLatencyMicros": 23,
      "p50LatencyMicros": 19,
      "p95LatencyMicros": 27,
      "p99LatencyMicros": 60,
      "maxLatencyMicros": 2028,
      "samples": [
        {
          "index": 21000,
          "testId": "req_poison_replay_21000_bb13",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "825917d0c238da136b50672e8b7f084a19bb5f82d9f37f2d2096acc9ad419b09",
          "receiptSignature": "ec22caf9faf00b461ae54b17db9f3e01d2919b9d950e4563e813bc3747dd5b49",
          "latencyMicros": 38,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 21001,
          "testId": "req_poison_replay_21001_c772",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "3631c1a4c16681b298df31f21f3223f9365638828bb875f2eab4ec00bc50fb76",
          "receiptSignature": "ee00bedf0ff3a30066ba27292a31b26821ee807de458829d7c1a737db09f617e",
          "latencyMicros": 21,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 21002,
          "testId": "req_poison_replay_21002_5cca",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "17611475204feda1abcd164228e8950964945fa234e11ad5a6a29ef3a6fc3500",
          "receiptSignature": "48ad8d001febe26d889724835b67a8d230fa217e5ba1f4e13d6086240770ea03",
          "latencyMicros": 17,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 21003,
          "testId": "req_poison_replay_21003_73c0",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "2ffebfc47c4efb6cb156b3756cb312f426cf3f5f3d897ea570bc2b9ac3555f97",
          "receiptSignature": "f408ac22817f2d395c2e5396e56e05583efcf30adcb20a62ae465b72611d2d5b",
          "latencyMicros": 18,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 21004,
          "testId": "req_poison_replay_21004_e0f2",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "c8bd660ae163a7152b4d0df86eb32df27e8d39108c9fce6cf5a0d084ea71c6f3",
          "receiptSignature": "816b5225ae53dfb7c8ec57a852c5aa0b34abfe9b7f866f758cf388311386baf8",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 21999,
          "testId": "req_poison_replay_21999_56d9",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "3c7b0e9571d3e30f957abe6c97f9efc406ec8ed489daee8d8d802f070f2b6a0b",
          "receiptSignature": "ea76af5cd2278d9f535a77668bdbc3f66cdf1c53307efa244b8e8d155a42431a",
          "latencyMicros": 17,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        }
      ]
    },
    {
      "batchIndex": 22,
      "startIndex": 22000,
      "endIndex": 22999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "REPLAY_CONFLICT": 500,
        "UNAUTHORIZED_REQUESTER": 500,
        "INSUFFICIENT_EVIDENCE": 500,
        "STALE_AUTHORITY_VERSION": 500
      },
      "batchMerkleRoot": "2d0e03a7cc63613bfe2c420c4f81d9a93bf1d9b885f18c1b0b480a51d47ff05b",
      "durationMs": 43,
      "avgLatencyMicros": 33,
      "p50LatencyMicros": 23,
      "p95LatencyMicros": 41,
      "p99LatencyMicros": 114,
      "maxLatencyMicros": 4493,
      "samples": [
        {
          "index": 22000,
          "testId": "req_poison_replay_22000_f95f",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "3ab6ffb0fe4bf67c4c889f5deaa03857a170f5a2cf1fcf72c2eb30a9bdb6c13d",
          "receiptSignature": "ae4dd30f4ed4da2cdf1bae0f5546c66d647c365805116146707a3e037a68e6b3",
          "latencyMicros": 27,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 22001,
          "testId": "req_poison_replay_22001_7b14",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "095f7ef013183a32228e1a7607d400b725e99d6ab70328f6e2e177e63ab4515b",
          "receiptSignature": "fabbf5d5bb5506717b97354aa8f2d07df0bdb052006a235da7bf73b3dcd375fb",
          "latencyMicros": 21,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 22002,
          "testId": "req_poison_replay_22002_e187",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "a2f428997fa058ec01b782bde0dd900322f9af9b47c5db0b62006f36a4a0290a",
          "receiptSignature": "e442e4d772b6a0be9e6879c58b359ed531e5c247bae4a38da4f15ceae898ea06",
          "latencyMicros": 20,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 22003,
          "testId": "req_poison_replay_22003_4f2a",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "b20d23aab24258e1de45393abfbc386636c26db4932a49b531132a25d5149da6",
          "receiptSignature": "6607870076eaf82ae783434377a97878793540c9c2fef8b24215d580bed08bb5",
          "latencyMicros": 20,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 22004,
          "testId": "req_poison_replay_22004_2ed6",
          "category": "REPLAY_COLLISION",
          "subjectId": "atom-core-001",
          "requestedClass": "ENTERPRISE",
          "requesterId": "ATTACKER_ANON",
          "decision": "Denied",
          "violations": [
            "REPLAY_CONFLICT",
            "UNAUTHORIZED_REQUESTER",
            "INSUFFICIENT_EVIDENCE"
          ],
          "canonicalHash": "6d757d5c40e81a02502b67a5f035dc3aa74a98df99b21c6f0ca2de637327ce9a",
          "receiptSignature": "4516900422a3aba84f323b7bc1620f87355fc0088992207c75a7412673174b2b",
          "latencyMicros": 17,
          "explanation": "Boundary checks failed with violations: REPLAY_CONFLICT, UNAUTHORIZED_REQUESTER, INSUFFICIENT_EVIDENCE"
        },
        {
          "index": 22999,
          "testId": "req_skew_22999_0b7480",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "54243a82baadbe5e0259e675ad991277dc8442c7b697b1fed7cc889bd3db338e",
          "receiptSignature": "6ceb2b741368b351f4984583709aabd4ceb82d947247475c16a409c6f8d9431a",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        }
      ]
    },
    {
      "batchIndex": 23,
      "startIndex": 23000,
      "endIndex": 23999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "STALE_AUTHORITY_VERSION": 1000
      },
      "batchMerkleRoot": "6061bf3192656ad3286f851daf48232ba890e4df4a8bc57525eeed96a025abbb",
      "durationMs": 38,
      "avgLatencyMicros": 26,
      "p50LatencyMicros": 24,
      "p95LatencyMicros": 33,
      "p99LatencyMicros": 47,
      "maxLatencyMicros": 1013,
      "samples": [
        {
          "index": 23000,
          "testId": "req_skew_23000_e62ba5",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "accc512c30be50115df6df71dd74b43cbd82751288f5574ec13f262f4835d09c",
          "receiptSignature": "d7b58b64bc20fe5887672138b1bae769fab5b21f54b8817ec877acfd24f0d63c",
          "latencyMicros": 43,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 23001,
          "testId": "req_skew_23001_33451a",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "97daa143c1f46879a4f5ec89b04ca23254d499e1f52f162b49f6c412a61bb4be",
          "receiptSignature": "9e387a43a4e8e7baa4bb1c0c37f3612033b1142d91459bb66e3f31d24fc0af6a",
          "latencyMicros": 28,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 23002,
          "testId": "req_skew_23002_7f8a95",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "a1271531160d73999eb8238ee6ed0ec92a942fc91c83fb70c83687e7c59fe0c2",
          "receiptSignature": "0b81ca52684dc35aead6c9076d2812e7454198cd25ba68f61119314566fa2906",
          "latencyMicros": 23,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 23003,
          "testId": "req_skew_23003_cc1ac0",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "26a7b5e3fb8d1ab3ac823429accd11a60649369d74bf7e65f3dc6705637b76cc",
          "receiptSignature": "597ba4c01f85ecc02ef907f993991bebffe91b16efe06a611809e78112e8e43c",
          "latencyMicros": 23,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 23004,
          "testId": "req_skew_23004_4adbe3",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "9abd4693a51efd89025901ae3f81b00b19bbcbb7ee5515dd8ba78610bde0c2e7",
          "receiptSignature": "77e091065b14c2ed4b697a7fe09e84e44d491b3d08cc6c13e6e0c953e61bd22e",
          "latencyMicros": 23,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 23999,
          "testId": "req_skew_23999_5f4126",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "fb1ba589275c82ad0389ce4b604d9409e41b5c829c84bff160c07bc6c8551286",
          "receiptSignature": "9b5d775ff890f412cc62681eccbd9e874f205a8cabffd2c92276548715c49d77",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        }
      ]
    },
    {
      "batchIndex": 24,
      "startIndex": 24000,
      "endIndex": 24999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "STALE_AUTHORITY_VERSION": 1000
      },
      "batchMerkleRoot": "eac8366f91273e47a7267b52abf9f45e423dfa0478f4821d7e6ba9bfdb52b44f",
      "durationMs": 38,
      "avgLatencyMicros": 28,
      "p50LatencyMicros": 24,
      "p95LatencyMicros": 34,
      "p99LatencyMicros": 71,
      "maxLatencyMicros": 2506,
      "samples": [
        {
          "index": 24000,
          "testId": "req_skew_24000_28db72",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "cfbf66f8e1e1ddad26bc0e75565f859e7dd491c2fdf9dc61f20d264e10d71dce",
          "receiptSignature": "026beb9f14d61fffda4d13b43f68e0432854c7a495c29969346a24cd7f11c1ca",
          "latencyMicros": 41,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 24001,
          "testId": "req_skew_24001_a1c493",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "aa441f527336ce1034f0fa29e2129fd62e26d379169662cbd6546ba2fdd112e2",
          "receiptSignature": "fd2aa2073c54f3575ddbbd1d0f4854b72cbea1245a8dfe36eda1a7d13b60d027",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 24002,
          "testId": "req_skew_24002_485b6d",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "9ac902fea6f77c9d7e8332330ea8638bbff608782af6501b272963a217255c88",
          "receiptSignature": "fe5878e5d73d9938a64a4e2dbede52a39f7b24462c0b761222e83ab97eeba329",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 24003,
          "testId": "req_skew_24003_818dde",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "bcc7fd5a8d16cbadb2d8851ec5ecf26c68a3c482bf1a19fb8ae633e44c1e0ea9",
          "receiptSignature": "2617789242fa1caebdd6b921bc0db4db2a0ef023e46568b2f56cc2f46fadb79a",
          "latencyMicros": 25,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 24004,
          "testId": "req_skew_24004_cadc7c",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "7b9eb8550333d9c2ae1f1bb4d71ba29280985375749a7cd0003c39bea7301912",
          "receiptSignature": "e27e1afe4f52366a205a48b9b86043a1c3a272f445780a4e3c197664de9ea7a1",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 24999,
          "testId": "req_skew_24999_1e6fc2",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "b9794caa118a1e63d116cd05250ab38f82df636137b8de216dc3f57772404557",
          "receiptSignature": "f9d477fe769a3627aefca6b781c6f36110c90bf4c64e726b793d157930f7dc1f",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        }
      ]
    },
    {
      "batchIndex": 25,
      "startIndex": 25000,
      "endIndex": 25999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "STALE_AUTHORITY_VERSION": 1000
      },
      "batchMerkleRoot": "13bd403673d2432aa74e54595d7a2321d4cb2be7792f45d2ab79c8737cc75f36",
      "durationMs": 40,
      "avgLatencyMicros": 30,
      "p50LatencyMicros": 24,
      "p95LatencyMicros": 35,
      "p99LatencyMicros": 148,
      "maxLatencyMicros": 1162,
      "samples": [
        {
          "index": 25000,
          "testId": "req_skew_25000_1d8697",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "d006cf0e2c4862b71143f52324e56d57fe272d39b0512b9898d1d52cbab241c6",
          "receiptSignature": "b80120aa61d8d0021dd482f90f957b58dd1a9fca286f2ea43ea69e4f77e29f5f",
          "latencyMicros": 42,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 25001,
          "testId": "req_skew_25001_d4f558",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "4f79e4f19dc279d4bb56faf121ecd5f33d857a541f0aa1a219fbdc40c3969ea0",
          "receiptSignature": "03c7bfebc6a0d50750b6ed3e9cf6281d197adacbe056c7041f264d56a55b1755",
          "latencyMicros": 25,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 25002,
          "testId": "req_skew_25002_1623d7",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "b13b84e8601532c3a99c64f3858dfbc6f5a5498b081a27f4ec898c12608371a5",
          "receiptSignature": "1760500085ab6fae18e82af6e21dc56802b62918512723ba6ead7cb16b923ae4",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 25003,
          "testId": "req_skew_25003_a638dd",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "4a5c4f957d272fdf37bc87aef0ce75f518ac19cf54bcd4b401d5914aed287e46",
          "receiptSignature": "4faec872ce6a558e2100a62deb94a2b63c59b9119b89cbbc14438126ea4edfed",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 25004,
          "testId": "req_skew_25004_aae9e1",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "8a5304060822d97977d8bc74234438dd3673e1ad667b6c4e87dc52f7487e172f",
          "receiptSignature": "790aae15ea4b1cbe8ace7f8270000f05f0744af5a8ff735f3fbe586c620133a7",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 25999,
          "testId": "req_skew_25999_18b236",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "6035ae657a89f39c6caac79498cfe752cc9f7d5f69cfb41e185c64defd8431e5",
          "receiptSignature": "83b73ec9d06994d78d9f0c61df66d0a4dfe64d8e6735b3b367a9b2237971715d",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        }
      ]
    },
    {
      "batchIndex": 26,
      "startIndex": 26000,
      "endIndex": 26999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "STALE_AUTHORITY_VERSION": 1000
      },
      "batchMerkleRoot": "a235f90d580840115714b4c46de1f51476fb587b7b156060a3dee0f4dd66d3b8",
      "durationMs": 39,
      "avgLatencyMicros": 29,
      "p50LatencyMicros": 23,
      "p95LatencyMicros": 36,
      "p99LatencyMicros": 101,
      "maxLatencyMicros": 2460,
      "samples": [
        {
          "index": 26000,
          "testId": "req_skew_26000_063cbb",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "975cdc91fcdfae315c94a677e2009bb47b9e9cab9ade14d5e4586264587f7caf",
          "receiptSignature": "53238228744503ef76a2b1b873b045bab353e5917bad64772f3cbffe0f0b5b9f",
          "latencyMicros": 32,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 26001,
          "testId": "req_skew_26001_5d0b41",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "7b0a749d757c16e1724c36e051340fdc2516959c5caf238d3e6aeb3edcfa5baa",
          "receiptSignature": "039171ec81b92d3898d68e87264a19a82c28de297732269732d053580d7a6648",
          "latencyMicros": 28,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 26002,
          "testId": "req_skew_26002_75eec1",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "feabdef7d998bbcd1de35da078993a96d524b449ceb68fa8c114111ea8d6cf81",
          "receiptSignature": "207d7e2989f139a30bd61b0f7317499bd345939c2c5740f0c8bd587115ec2685",
          "latencyMicros": 23,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 26003,
          "testId": "req_skew_26003_12f0ef",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "0b7ec6ee9219a98c69fa5c3345a32608447c3531db5e5c57c23994c38de063cb",
          "receiptSignature": "ed26fde5b667328d549b3eed90ffd00c73da061f44c2fe844df0c3dc0a31165c",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 26004,
          "testId": "req_skew_26004_844f7a",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "3e7a1bf1cc628b47dd1e3fe0f16b3c9f360e7d65e4445d610c6abf3768a1c628",
          "receiptSignature": "0081b6f92710df28f09ac67d8b4b363648716371aa58b4350d1b8910f30fe5ba",
          "latencyMicros": 23,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 26999,
          "testId": "req_skew_26999_1ea682",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "9aecdf94181118dd289a40136a858473e1cb0b5009c0dffbaabac36e6033f651",
          "receiptSignature": "55d3d96745b3735fe9e8b3578000fe89c003c5f359274a9d5a9434e582be8c50",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        }
      ]
    },
    {
      "batchIndex": 27,
      "startIndex": 27000,
      "endIndex": 27999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "STALE_AUTHORITY_VERSION": 1000
      },
      "batchMerkleRoot": "8010921211bc8915e7a2368d1c0df73cbd78ed4b07e5b5a16e6dc18093e59e5f",
      "durationMs": 38,
      "avgLatencyMicros": 29,
      "p50LatencyMicros": 23,
      "p95LatencyMicros": 33,
      "p99LatencyMicros": 87,
      "maxLatencyMicros": 3022,
      "samples": [
        {
          "index": 27000,
          "testId": "req_skew_27000_3be5c6",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "ce8a03ee06dedde5906bf48f471304a77563941e32f9c7436664270d28239f15",
          "receiptSignature": "04362a4f3dea3a83e4433a56199ae2c444b8149526600cb28d7cfcbaac93db89",
          "latencyMicros": 32,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 27001,
          "testId": "req_skew_27001_d6199d",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "17f457b776458e560a5750abeb35d023dac775cc66dce1b89a45de33139b2954",
          "receiptSignature": "fd27c686c2529f110746e32e31372a30be4af2d3116a6ac50f99192cd6ca1656",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 27002,
          "testId": "req_skew_27002_0a367f",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "f6410b7f9109e010238b31b41322e2293b8e1f236ac15f14904e81d4a6c6917b",
          "receiptSignature": "99d3e1abb9ffebf7ffb4dc0d20999797760fbe765f348f171ce3dab78dd9f60c",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 27003,
          "testId": "req_skew_27003_c5cf94",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "a50f1b4531d5370fb0128ef43c9ca3e239cd9a158d4c73fb72dc1151f5907faa",
          "receiptSignature": "c0112c1d02e936683916f2efebd8085208fad87f90c9ec40109d7426a9343df5",
          "latencyMicros": 25,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 27004,
          "testId": "req_skew_27004_511443",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "294858bdf45cf0a70da4bf0ea4696f4bd242a66259ad796a8cf0e2ec3dd9fe76",
          "receiptSignature": "68b12039da13d72d0fb947dd680777ce27541d7af4dee274c390b1afd6582e00",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 27999,
          "testId": "req_skew_27999_c74215",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "a4b94f94b966cf096547df015e6dff7d068c5bb5caa2fb33ac70de4b4994554e",
          "receiptSignature": "51ea868f97576fd5d0be1915640bb90a5807e0883b4ab591f555d488f4ca3d0c",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        }
      ]
    },
    {
      "batchIndex": 28,
      "startIndex": 28000,
      "endIndex": 28999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "STALE_AUTHORITY_VERSION": 1000
      },
      "batchMerkleRoot": "f9ba732a40a4c4823e13115121ac201f1c2f439d65a0521f4d8cf072b35637da",
      "durationMs": 36,
      "avgLatencyMicros": 26,
      "p50LatencyMicros": 23,
      "p95LatencyMicros": 35,
      "p99LatencyMicros": 45,
      "maxLatencyMicros": 1647,
      "samples": [
        {
          "index": 28000,
          "testId": "req_skew_28000_ff8ce1",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "55bc951197890b6185358e7a22a502840656f87c7e981e0c9632b16d599c3df7",
          "receiptSignature": "9e24b1769f7e08d849f366658fec097ddb9f839e47d969451e79f1f8cffd0ae1",
          "latencyMicros": 29,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 28001,
          "testId": "req_skew_28001_c43bdf",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "09e5d189b2ceb71062042f4df6413bc0326ee75a552a70c27e31e1afbe52a629",
          "receiptSignature": "ab30893014c513b2a90d1c2cecd3df9261b4e54c6e87037e69ed7345242826fc",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 28002,
          "testId": "req_skew_28002_aec3a5",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "2940240714dbd498eb7db6a8e58e65407848b995180c0c50612e45c18a4940f4",
          "receiptSignature": "0e5bc075210ba69e883367450e9ac6a371fae85cd3c9dc510a60ff6dd990d53a",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 28003,
          "testId": "req_skew_28003_3ff8ac",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "b383c9ae437ab41a8069fb8514693ab88ec1bd7d36b7e530f75e552a0e3b735a",
          "receiptSignature": "b6ffd51250e8545be786dc5ce663cfe1cd59fabecb2d727920e5b208848ff607",
          "latencyMicros": 23,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 28004,
          "testId": "req_skew_28004_0ad579",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "4946689320c1434d80ceed6ee4ad9d28e2a6df2e0b0895f8a0c01e5d916df784",
          "receiptSignature": "b9f6fa121006e48ee86ab2982a7fa9e2fbadbbdc59b548f19577e3870ecc0ef5",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 28999,
          "testId": "req_skew_28999_767e14",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "e0353958257fcf0d8d0f6aa9997e8fb73555b16adcb886e5b86aaa522888341f",
          "receiptSignature": "002eb9b6e33493bf9722806aea9e6a992b3568d83b25fc5635c61e41fa92cd9f",
          "latencyMicros": 23,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        }
      ]
    },
    {
      "batchIndex": 29,
      "startIndex": 29000,
      "endIndex": 29999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "STALE_AUTHORITY_VERSION": 1000
      },
      "batchMerkleRoot": "87b8fbf38423a71efbdc95b2deb20626d375fb57be70fb7add726ebb3e3fd995",
      "durationMs": 35,
      "avgLatencyMicros": 26,
      "p50LatencyMicros": 23,
      "p95LatencyMicros": 31,
      "p99LatencyMicros": 40,
      "maxLatencyMicros": 1402,
      "samples": [
        {
          "index": 29000,
          "testId": "req_skew_29000_e2f022",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "bd523ba530277f7fac418f2ac45fd97d1969bb315e23f8086b001dbce210a871",
          "receiptSignature": "37443e40e6808932ff1d23b5d5c03b400048b536587195bd8c14d52d91412ce3",
          "latencyMicros": 31,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 29001,
          "testId": "req_skew_29001_2acc33",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "3230f0449ef8cf2eaa3e2a9483cdad3db5e0e2f9c8abcc57e2b419b0079d0485",
          "receiptSignature": "b85ea093fd8fb1618faa70f9c4948490437a968d8e23d558c8e04ef86fe1de70",
          "latencyMicros": 26,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 29002,
          "testId": "req_skew_29002_6c3226",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "6f282d67e9e857154180a60060cba1d7b9db4f65766a8e542bd07b6e04f82204",
          "receiptSignature": "53a30598a1b5e067318b08aed9fc485434bc1b88a7f0c91f065a82280d03646f",
          "latencyMicros": 23,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 29003,
          "testId": "req_skew_29003_5b5b5e",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "35e82c09bb7d0893cb6d278c613d2c82d2589030bd220a1044cfa80a64bf1d5a",
          "receiptSignature": "69c89d6fde911ce8f017e3f8d3979e579725c2caef3edbc61a3418af34891022",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 29004,
          "testId": "req_skew_29004_42a2f4",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "29d2303e5b87a1acbf56e130edd888e19bf92f8f448de382991f82102639bbba",
          "receiptSignature": "b0f2efb909019a92c26d0d971cfb5ae8be02c47afa08ba6707b147ca1fd3f5f3",
          "latencyMicros": 23,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        },
        {
          "index": 29999,
          "testId": "req_skew_29999_91bc05",
          "category": "EPOCH_DESYNC",
          "subjectId": "atom-fact-002",
          "requestedClass": "FACTUAL",
          "requesterId": "RACE_WORKER",
          "decision": "Denied",
          "violations": [
            "STALE_AUTHORITY_VERSION"
          ],
          "canonicalHash": "66aa573ee0f14e97eb2e5d3654ffab2e3f9e2a8325d6840809f4b01c258b7435",
          "receiptSignature": "4b2b641239424b0a4c84d6f0049bf979c969432673dc55319538a3bf3551d6c0",
          "latencyMicros": 21,
          "explanation": "Boundary checks failed with violations: STALE_AUTHORITY_VERSION"
        }
      ]
    },
    {
      "batchIndex": 30,
      "startIndex": 30000,
      "endIndex": 30999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "DEGRADATION_WITHOUT_REASON": 1000
      },
      "batchMerkleRoot": "5940901394015c994b176bfbe6f2836ed06e943024b8295d4714a34c64a53b72",
      "durationMs": 35,
      "avgLatencyMicros": 25,
      "p50LatencyMicros": 19,
      "p95LatencyMicros": 36,
      "p99LatencyMicros": 86,
      "maxLatencyMicros": 1699,
      "samples": [
        {
          "index": 30000,
          "testId": "req_deg_30000_29fed1",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "bfed13892505fd86cb5971bb48885eb82cd1cfdb60fc707eba38c500b3d43b1b",
          "receiptSignature": "dc24460dd0378b0e33a6f1db48953c7ea9d98fc300e573dc842cd5a9bd329088",
          "latencyMicros": 92,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 30001,
          "testId": "req_deg_30001_fb1097",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "83b562699203eee7b53a0f3e6a4b51a1d05399caa7395f4deaf510b3480879fc",
          "receiptSignature": "bdea12bea61e923ad813612eac419187ce11ffda4983eb25a863d9cf53910f70",
          "latencyMicros": 28,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 30002,
          "testId": "req_deg_30002_2c013d",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "02a4d558ed986727f1c1111fcd4bbac310b9a23779aa8ab4a51771dc7a73f4ab",
          "receiptSignature": "445f185f2a8b7504589d4dd1cc1ddcd8c56e4252fbcce771ac5f25751df2c00f",
          "latencyMicros": 29,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 30003,
          "testId": "req_deg_30003_e54cd1",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "550bc2cbe5a69bbe6b6cb81f2137726e494310c69243c27fd17c57c02b4b8eaf",
          "receiptSignature": "cc88965afc83165ad96e8a2fd932c465b3485fdc7e70a0686f94edcde5e5beca",
          "latencyMicros": 19,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 30004,
          "testId": "req_deg_30004_26facc",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "75214f91c77ad15c278cca010b28b80a909ab7aad0c9b622c91ad5fb3b7daab2",
          "receiptSignature": "3f0facf5a915702b463ab1e45bfd256263d8262615f2bf33e256474d55cfb47c",
          "latencyMicros": 17,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 30999,
          "testId": "req_deg_30999_9acd1a",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "c9183ff33c027492946ad0b8faac807d91ab98fe099292d8277b09c16a1525dd",
          "receiptSignature": "598420afe62bbcc18fcfae1498518c423e59da5e572b562cd8aa18c4e5456f82",
          "latencyMicros": 20,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        }
      ]
    },
    {
      "batchIndex": 31,
      "startIndex": 31000,
      "endIndex": 31999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "DEGRADATION_WITHOUT_REASON": 1000
      },
      "batchMerkleRoot": "179c9b36192a36055785eba7f43d0656e27f8f6ebe36dd8d9ae597caba8b5945",
      "durationMs": 33,
      "avgLatencyMicros": 21,
      "p50LatencyMicros": 19,
      "p95LatencyMicros": 30,
      "p99LatencyMicros": 54,
      "maxLatencyMicros": 386,
      "samples": [
        {
          "index": 31000,
          "testId": "req_deg_31000_1c3c12",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "31b3ee8bd37b756da1ca480aad368539b7cfeae92e7c35dd734a4ed83d49f100",
          "receiptSignature": "487032f8a7c0de6ba133b7e3e4296696a0eafbdadff94ff9a68c052955adf033",
          "latencyMicros": 35,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 31001,
          "testId": "req_deg_31001_23fe6f",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "d70f29fc54014d52558bf0abeb7b62d889ec5551084b4f785d5e5785968f268d",
          "receiptSignature": "57fe8589311b0e7488d1063d4b5bb9141558a8919fca6fbf5fa92666ce585cea",
          "latencyMicros": 20,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 31002,
          "testId": "req_deg_31002_582430",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "6c1bfcf991e5f3904f7a614f1c4531bb7186f3265aefbb6b5df6da8827d8bc3c",
          "receiptSignature": "e77044de689113043b44b47a7012a0e00d68786968d49a10bb3488233d9541f2",
          "latencyMicros": 17,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 31003,
          "testId": "req_deg_31003_36e431",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "83d4effef082335a14a04b9a6c827aa588e1d080da4470499eefb1c99ca2b9c7",
          "receiptSignature": "461205c9161654ed84ce88c0e5ded53d5a7512151f46c821b1f0523949fb995c",
          "latencyMicros": 18,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 31004,
          "testId": "req_deg_31004_009f2c",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "b59ee1ad2b19e1b9de3ba32634184633942fd693a7cc78a4d39b562c965e680d",
          "receiptSignature": "b33a78511c123ea5c5a586f40a891b5551320d6d8e31923ab8468a6c8e76ab51",
          "latencyMicros": 19,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 31999,
          "testId": "req_deg_31999_1e6d28",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "fe3c2b0f1221e4bb1426dde634aa8ddbfaa71e2cb1e1407dcca35394241b7b44",
          "receiptSignature": "d3dc033ede7b8f80fa11a275f30fc923132abadc6cea4ebcf6730418cdacb04f",
          "latencyMicros": 19,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        }
      ]
    },
    {
      "batchIndex": 32,
      "startIndex": 32000,
      "endIndex": 32999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "DEGRADATION_WITHOUT_REASON": 1000
      },
      "batchMerkleRoot": "76453ad5c48831a4ffd36c440d0b0ef24235390dfcbb6232760b46d15a7c9275",
      "durationMs": 34,
      "avgLatencyMicros": 22,
      "p50LatencyMicros": 19,
      "p95LatencyMicros": 38,
      "p99LatencyMicros": 54,
      "maxLatencyMicros": 354,
      "samples": [
        {
          "index": 32000,
          "testId": "req_deg_32000_c8c7cb",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "5cb1a7b2aeb9ae76b53aa6a7e1eb7e7e139a5954c6839f2ee3fa824e6903d895",
          "receiptSignature": "ad3eba04ab3713ed3a83a09410611f1d610fc88564c7744fb3b9069dc18cdf87",
          "latencyMicros": 32,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 32001,
          "testId": "req_deg_32001_1447a1",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "ff6c99d2c1b1b454a6668c12e5b9585f01f5ebbff311aa3c605391817ab95c80",
          "receiptSignature": "a52db6d08e57252a910038f466fe13e305e3f27ffaf6335d61f7c9ee3be7e219",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 32002,
          "testId": "req_deg_32002_18af16",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "d60757c9aad95b08e5922f8c84b36c700d363d51910f5a44cb0ec0d3c7ab7a22",
          "receiptSignature": "ff5d2f38b3c2e51ff9b527b487979c90a7d9949d86c75036de65b8feb6a97079",
          "latencyMicros": 23,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 32003,
          "testId": "req_deg_32003_57a2d6",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "9889831231bed3308fff8565f1fc80595255cd1f36e6cc681d775d4bb57ece59",
          "receiptSignature": "ff52c0b803f4653a6b7306ad7dfa0d4a2d537a007f8bbf3ecca5310238697954",
          "latencyMicros": 19,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 32004,
          "testId": "req_deg_32004_b7444c",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "1191220b20d6b1adbcc3321b1d105277a21c07fc65e5c695ac6626e8cb817adb",
          "receiptSignature": "680d70a03b21e798884c51407c69935fc89320a60dd6d70c1107a1543aeddc3e",
          "latencyMicros": 18,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 32999,
          "testId": "req_deg_32999_0eb61a",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "7f415457772dc91705ecf0bb738dc031fae86e3aa83c6b3dbba0b89dfa4a6229",
          "receiptSignature": "327069a097f0bd042c97e36c15950a1e944a4de239681b11f14574d3e563d3a9",
          "latencyMicros": 19,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        }
      ]
    },
    {
      "batchIndex": 33,
      "startIndex": 33000,
      "endIndex": 33999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "DEGRADATION_WITHOUT_REASON": 1000
      },
      "batchMerkleRoot": "f7282c1e505043a814e4cf6d9a26b8cf2adb91458d6c74945e0a4a9da12e5333",
      "durationMs": 38,
      "avgLatencyMicros": 24,
      "p50LatencyMicros": 19,
      "p95LatencyMicros": 33,
      "p99LatencyMicros": 53,
      "maxLatencyMicros": 2081,
      "samples": [
        {
          "index": 33000,
          "testId": "req_deg_33000_e19713",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "a885f04229024f762d7fa41b4407fdc3f29be69ba5047718c9c423c20308d04b",
          "receiptSignature": "0b9acfe35bcd1bb4b86ab83f4ccaf517f499e23d8ab8be6a6a9eaf773a35966c",
          "latencyMicros": 54,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 33001,
          "testId": "req_deg_33001_ed9137",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "69cc194e94c4b7221557dc828245368af5fa2f7f48e54e5684d0fac2c5c51105",
          "receiptSignature": "548b885ed491146d6da2f6bed19b99fa55e2376b74bd3879203c6ee41ff0e57c",
          "latencyMicros": 2081,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 33002,
          "testId": "req_deg_33002_567ac0",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "4307e907b83e182387a9e9827dfd73d1343f007879be9bc89f12bc5d21f3df20",
          "receiptSignature": "187e07d6eb95f13cfef1865044b3bbd5837c4a4bff74406508578d63a817befd",
          "latencyMicros": 29,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 33003,
          "testId": "req_deg_33003_c25306",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "11a1df79a4b482f64f76403e291cddd20ee1bfc53df4f3f566a07413cb834346",
          "receiptSignature": "9829335484cc233e3ef4878c14d6244f4d346354d741b369b91d8f846891f0dd",
          "latencyMicros": 33,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 33004,
          "testId": "req_deg_33004_2f6013",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "41d17e9f8eaa7c66d4ec56d472f07f03db63872f779d97aaa934aee863857034",
          "receiptSignature": "34d608ab7e5ba335792e6bb78179b1a5e4dc3a7f458af0c8bbe2ab23979998af",
          "latencyMicros": 30,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 33999,
          "testId": "req_deg_33999_97c8ec",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "699c4f4742ff6411638c5f472b8de7d021d975f2b8b29b8d2046c9b1c6fb61e6",
          "receiptSignature": "4380d0ca2aacaf3c48b874e3800255d6256107c4f7c6d41b0b8f064fe7b1f63e",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        }
      ]
    },
    {
      "batchIndex": 34,
      "startIndex": 34000,
      "endIndex": 34999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "DEGRADATION_WITHOUT_REASON": 1000
      },
      "batchMerkleRoot": "26f5e356af06e105a0813f1bc5f5986775d9e806b5d8c6be456e96403e0e4556",
      "durationMs": 32,
      "avgLatencyMicros": 21,
      "p50LatencyMicros": 19,
      "p95LatencyMicros": 31,
      "p99LatencyMicros": 48,
      "maxLatencyMicros": 144,
      "samples": [
        {
          "index": 34000,
          "testId": "req_deg_34000_af28bb",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "3eea31b7d6c3056aa64cbe7d067601df0ea8a066105edb6cf6984f38de3492f8",
          "receiptSignature": "c5ce475160a030e294438d7f55445d4709ad5130c9001ac9e7538cb0550cd053",
          "latencyMicros": 48,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 34001,
          "testId": "req_deg_34001_8348af",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "873a8fd4b1679a821d92482ae4b7c6cad516939e4e91e7817b78464a528eaebb",
          "receiptSignature": "5812b61662d1c6fca1bdc4661abcc25b9f692fb9e2b81873353e80d0833c330a",
          "latencyMicros": 21,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 34002,
          "testId": "req_deg_34002_03980d",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "343cee135233f938f10a175d41208dad68c441a67b205ebdd94cd5de24bbdbf1",
          "receiptSignature": "1fa9b5f3362fe6f80e404927e4ac02693a81fe8dca0f2a39f4d49779fa9905ac",
          "latencyMicros": 18,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 34003,
          "testId": "req_deg_34003_e29248",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "25e7d6d3dc3946504e7437c2cd889bede9357e55ab3b5e561c3c845e433a03ea",
          "receiptSignature": "dfc202075c94d56d020f252e6ab28a598f72b79c3636b389d83b327a6b48fc00",
          "latencyMicros": 20,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 34004,
          "testId": "req_deg_34004_039aab",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "2b778ff65a827fa61ed7121d683dc1696b40f012800da9c4593a0e54e58d6536",
          "receiptSignature": "da881da096a9141081d25ebc5d461fbbc0521a1e656d46d309f0329afbe84699",
          "latencyMicros": 19,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        },
        {
          "index": 34999,
          "testId": "req_deg_34999_e00535",
          "category": "ARBITRARY_DEMOTION",
          "subjectId": "atom-core-001",
          "requestedClass": "WORKING",
          "requesterId": "ROGUE_OPERATOR",
          "decision": "Denied",
          "violations": [
            "DEGRADATION_WITHOUT_REASON"
          ],
          "canonicalHash": "d0c14bd0244fb53bb1743998892291adaa06d1a6feec62843a94e254795c013f",
          "receiptSignature": "3906013e15bddb0fdcd89669602b31de4bbc3febe25c7c93b13b7f6e598e5935",
          "latencyMicros": 20,
          "explanation": "Boundary checks failed with violations: DEGRADATION_WITHOUT_REASON"
        }
      ]
    },
    {
      "batchIndex": 35,
      "startIndex": 35000,
      "endIndex": 35999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "CONSTITUTION_VIOLATION": 1000
      },
      "batchMerkleRoot": "40e445b08f97bde1201113cdfa75c610e70b330e99cdd68f3c248d4c928c985b",
      "durationMs": 44,
      "avgLatencyMicros": 34,
      "p50LatencyMicros": 26,
      "p95LatencyMicros": 47,
      "p99LatencyMicros": 71,
      "maxLatencyMicros": 1902,
      "samples": [
        {
          "index": 35000,
          "testId": "req_const_35000_9d99df",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "DEVELOPER_LEAD",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "c83bd02313e954662325bf38f36430bd50026e2ba1816439fbb8336bd65134fc",
          "receiptSignature": "af3b8424f765b5d60311058a9d04e16a027d591d3ff1323721d684127bd487fa",
          "latencyMicros": 169,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 35001,
          "testId": "req_const_35001_9abca0",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "AI_AUTONOMOUS_KERNEL",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "2e94b6456057b51cb78d7e80477224354e8072a7c89bd0a51c71f4f9ea8f6dfa",
          "receiptSignature": "28f527bf9a434d72cc38cfb7868464b5df40e2b53657a042ab8ba40ab3a44377",
          "latencyMicros": 39,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 35002,
          "testId": "req_const_35002_13d061",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "ROOT_ADMIN",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "72ea332eb11b672b40598e57f05fdb474fef49061c8273ed7e3ecd10989873e1",
          "receiptSignature": "2b55971b57ee67f36f3f004b5ac30d96d28326267b6e7c5a49e9bf392d95956c",
          "latencyMicros": 32,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 35003,
          "testId": "req_const_35003_b30d30",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "DEVELOPER_LEAD",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "b395a695f7ae7f8adf16f7ea2d0c7cb11a47bf164bed8b60d265fce1358bc4d6",
          "receiptSignature": "b91d60f317608e183ef81d67fc273960ea2f05ff117778727b083ed5b2df7c79",
          "latencyMicros": 25,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 35004,
          "testId": "req_const_35004_3a1d36",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "AI_AUTONOMOUS_KERNEL",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "c5a60d450d42799b76fc120b11afe9ffc398a9df5e88f3b10658dcf920155abe",
          "receiptSignature": "743592567d6007ccb0b592ee40bb55a1d4565f86c30aa36feda53ac57819aed8",
          "latencyMicros": 44,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 35999,
          "testId": "req_const_35999_0e1bea",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "SYSTEM_OVERRIDE",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "6f51dd6d37c980da9e92b683436f3d821e2f56cb8f7e619c905a45200d188f2f",
          "receiptSignature": "b4b440332b22bd9a4e8382534afb37a31671dc1c9433b3bea441b4a2cca0753c",
          "latencyMicros": 23,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        }
      ]
    },
    {
      "batchIndex": 36,
      "startIndex": 36000,
      "endIndex": 36999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "CONSTITUTION_VIOLATION": 1000
      },
      "batchMerkleRoot": "2d645ed687c44bbe5198be32e6331719977cd6a991b5135eaf718687929ee31c",
      "durationMs": 40,
      "avgLatencyMicros": 27,
      "p50LatencyMicros": 24,
      "p95LatencyMicros": 38,
      "p99LatencyMicros": 114,
      "maxLatencyMicros": 338,
      "samples": [
        {
          "index": 36000,
          "testId": "req_const_36000_630fbc",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "ROOT_ADMIN",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "c51b58b021d877c6c96a3ea4591cf82b85e1a3bdc6207fce3d914fabe17edcce",
          "receiptSignature": "fb1df94eee49896db4b41c6b3d80629b9628a15efdf5c538a7a1307953ad3345",
          "latencyMicros": 52,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 36001,
          "testId": "req_const_36001_63e5ce",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "AI_AUTONOMOUS_KERNEL",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "4f7c67d3a0e84e8068f9acf2c10e3d9fef0a64e2da17a8cf39fab8c7bc715cc2",
          "receiptSignature": "b1d72811af9416c2b02a021f9c91a5ae9e286b3a3378431cefee601e45a9d766",
          "latencyMicros": 35,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 36002,
          "testId": "req_const_36002_60f384",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "BOARD_MEMBER_1",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "7e25ee0a332c51430c4605daf577f7d66ef058e4a3e19b42de5025fe34dec39b",
          "receiptSignature": "0f9bc4e70a526bc166366e443735121ac8c6681f93cc9251cf84d8ceaa3143e0",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 36003,
          "testId": "req_const_36003_36fab3",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "ROOT_ADMIN",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "f86e9252a573053eb997e54235060ea854dc74412d701d884eb1a79abffd9810",
          "receiptSignature": "c8bd11111683015038b18efbc6949252f869ad2a72059584f7edbfbf7bd6b7d5",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 36004,
          "testId": "req_const_36004_a83d1d",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "BOARD_MEMBER_1",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "9c6c195937bc43598b08b001f39625c3b2d29aa1fe870b9e302c4a880a6dfb93",
          "receiptSignature": "f7411fc98e916238a28125b64454df1d53dd343f182f82edcb0346c21b3fb99e",
          "latencyMicros": 28,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 36999,
          "testId": "req_const_36999_38043c",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "ROOT_ADMIN",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "0632fed5f96c609905e78ba72ccf4f6976329b90ccb76e069a257465a2ca65fb",
          "receiptSignature": "015fe5e4aca93867276f8ada5675c147dbe3331e39b8c0536dedacb65b86caeb",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        }
      ]
    },
    {
      "batchIndex": 37,
      "startIndex": 37000,
      "endIndex": 37999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "CONSTITUTION_VIOLATION": 1000
      },
      "batchMerkleRoot": "ea744c5f59cd8dd2a936a135eae8e8a52b4225881478a5c1f1af8d42ec0bdc68",
      "durationMs": 47,
      "avgLatencyMicros": 34,
      "p50LatencyMicros": 25,
      "p95LatencyMicros": 34,
      "p99LatencyMicros": 134,
      "maxLatencyMicros": 3307,
      "samples": [
        {
          "index": 37000,
          "testId": "req_const_37000_a8439d",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "DEVELOPER_LEAD",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "0a504ca9f9ec47386348a04caad900ba9eeb41f971a2926e8cabb20fe7b98a20",
          "receiptSignature": "b24f802f46e793c45829b5bca3fc967f43c73e04bc1db2bb5cb183bda439d643",
          "latencyMicros": 61,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 37001,
          "testId": "req_const_37001_b8e31a",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "SYSTEM_OVERRIDE",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "4aba24691ce34655d0105ed229cf8f59a318ff5fa2e88b7bc98f5e9ba8009833",
          "receiptSignature": "02d48bbacc47f647f96b9a6bf69997757e847c0a9bc55df401f7795e8b329b2d",
          "latencyMicros": 34,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 37002,
          "testId": "req_const_37002_6c1ea0",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "BOARD_MEMBER_1",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "049f537280cc7eba4bbf3c6a434f39430ad92da21f6cee6e3650b9cb0c364654",
          "receiptSignature": "af91d72040dab13924e80738e1d1f1c74a53af6c50796cd6d762490b862572c3",
          "latencyMicros": 34,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 37003,
          "testId": "req_const_37003_8df30f",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "DEVELOPER_LEAD",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "62ac4039eddba4cff690761f1b822ca23aa6204c077e769d638326fd8fb84607",
          "receiptSignature": "48290162631ebce1446d2cc34eee22ea87006a704244715989bbb105f29b8747",
          "latencyMicros": 26,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 37004,
          "testId": "req_const_37004_7d6411",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "AI_AUTONOMOUS_KERNEL",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "5035072360ee8bc47e768002e68f268ea6d9206066a281146ab2d9bba5dad687",
          "receiptSignature": "c74aaa8702b73960b3990f90475b901d0f52bfd889bf7b2cd015270fa12832d7",
          "latencyMicros": 31,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 37999,
          "testId": "req_const_37999_a275a2",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "DEVELOPER_LEAD",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "ff1e48d54dea81cb3a35cbc85f1612956a726530233d229b7d6e14a2584142d2",
          "receiptSignature": "647fd957348174e0085c9ae343974120a616d0c16f95fb9f6da459a343f1267d",
          "latencyMicros": 26,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        }
      ]
    },
    {
      "batchIndex": 38,
      "startIndex": 38000,
      "endIndex": 38999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "CONSTITUTION_VIOLATION": 1000
      },
      "batchMerkleRoot": "0665251afed634ea078f5c3a0a8a9241f2ce42e09d8db03b63b727d1459dc521",
      "durationMs": 36,
      "avgLatencyMicros": 24,
      "p50LatencyMicros": 23,
      "p95LatencyMicros": 29,
      "p99LatencyMicros": 40,
      "maxLatencyMicros": 608,
      "samples": [
        {
          "index": 38000,
          "testId": "req_const_38000_7f2874",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "SYSTEM_OVERRIDE",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "57fd4bcaa5c5f4756db069e1bfbac97d47d3d7e02fe8dcdba8c0d9076cae68fc",
          "receiptSignature": "3982eb3a7842bb81270c8b6ed797094b8b98ff9800bf21923a06a7182cf67115",
          "latencyMicros": 55,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 38001,
          "testId": "req_const_38001_d1f395",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "BOARD_MEMBER_1",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "5b5ab3f888f38dee458fad1e11e653ebb73bd155eb0d1078853767053149f481",
          "receiptSignature": "98d5a50d91b6e09231d16d2fe6af394be69867a9a63701e513dd0536cb10d4e9",
          "latencyMicros": 608,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 38002,
          "testId": "req_const_38002_b23c55",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "AI_AUTONOMOUS_KERNEL",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "bb20b0ad6bea60552ee7524ff83ea9e8dbe2049fac1edcc8d9d5cad21b100af9",
          "receiptSignature": "b404351d3d44b3fdd90aeb4f994fa2f58fb4f7321f69ad0d9a6bf720c64fbe11",
          "latencyMicros": 30,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 38003,
          "testId": "req_const_38003_f10557",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "SYSTEM_OVERRIDE",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "041e36dd1edf20ced01895e490be422b25b1cc4ea30a9b2e426d342404a369be",
          "receiptSignature": "5fde5f16ae807be3f6dcf92399c29a4574ee7c7d041bffcae8c8e571140344a2",
          "latencyMicros": 31,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 38004,
          "testId": "req_const_38004_3acdc1",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "AI_AUTONOMOUS_KERNEL",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "5913a2bc6e27e0de401248dc3f8041df8a86a128f98960e645b5ffec0a2cbbb7",
          "receiptSignature": "7618fc9e5c34adcef9139cc8ecfbbd9e65fdd503572476d6825753d650eb27a2",
          "latencyMicros": 30,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 38999,
          "testId": "req_const_38999_3a7641",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "DEVELOPER_LEAD",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "93619e7b6e16a28d7ae943bebbf7f9566000daa67e7341aa9637966634a9671a",
          "receiptSignature": "1b13c00257258c13e21b48f05e0030a25e2b46b063234eb82b734553281f265a",
          "latencyMicros": 20,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        }
      ]
    },
    {
      "batchIndex": 39,
      "startIndex": 39000,
      "endIndex": 39999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "CONSTITUTION_VIOLATION": 1000
      },
      "batchMerkleRoot": "d83698ac397375f7db697e96ca2638d363c751befb1e2150672ba1aa763d6451",
      "durationMs": 37,
      "avgLatencyMicros": 25,
      "p50LatencyMicros": 24,
      "p95LatencyMicros": 29,
      "p99LatencyMicros": 45,
      "maxLatencyMicros": 317,
      "samples": [
        {
          "index": 39000,
          "testId": "req_const_39000_655de3",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "BOARD_MEMBER_1",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "f731d30466c7fdb1480d6f4d9b1a81ce53f63d4097c80b8a94ededad86f396eb",
          "receiptSignature": "d3902a72500528258fb5ecbb69f3fa06807aa37b47076572ea4bede9e43b77ea",
          "latencyMicros": 41,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 39001,
          "testId": "req_const_39001_a20b15",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "ROOT_ADMIN",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "dcdb8af4b138576cc058446c834105a15131af1e4dd1387df27b17e28ca92c23",
          "receiptSignature": "599b39009b6d80c770d97771f8ecd2686990bb124eefcd9deb386c54b7a76d9a",
          "latencyMicros": 25,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 39002,
          "testId": "req_const_39002_2a132b",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "SYSTEM_OVERRIDE",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "a6bad77cd20d5673d3c1ec7836513a279a514a67cfc19db90a84a32fac9bae74",
          "receiptSignature": "e7b03335f7819eb255a95c023e5713d7309548d733ef697a346d21f4059839e3",
          "latencyMicros": 24,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 39003,
          "testId": "req_const_39003_edad21",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "ROOT_ADMIN",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "7936d64fbecac988555e0f8b63708658223c2d2ec6533770146e381d5b43d6a0",
          "receiptSignature": "8033ad8a252fb3b179b944884113a89b0a3a29baec62ac81f29e051012ac2700",
          "latencyMicros": 22,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 39004,
          "testId": "req_const_39004_eb0aa6",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "BOARD_MEMBER_1",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "b8531bcf1a284c2769e8b8dc45b323faea786cbbee3b339bbb1f7163a29c3fe7",
          "receiptSignature": "d894e47f15e7ee48b11cd57b6c4b7c6a69541cb2010e1ad53110e3e8a34cb07f",
          "latencyMicros": 25,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        },
        {
          "index": 39999,
          "testId": "req_const_39999_134073",
          "category": "CONSTITUTIONAL_BYPASS",
          "subjectId": "atom-core-001",
          "requestedClass": "SYSTEM",
          "requesterId": "SYSTEM_OVERRIDE",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "9338f13f140b065513b18a9abf11af0deb9f36cdcc040ef3f5c95d2b28d08307",
          "receiptSignature": "b887b88d9527fa2d950fdb993484e6b3cd1b0e2806b27db3b362fd56b5827cfa",
          "latencyMicros": 27,
          "explanation": "Boundary checks failed with violations: CONSTITUTION_VIOLATION"
        }
      ]
    },
    {
      "batchIndex": 40,
      "startIndex": 40000,
      "endIndex": 40999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "CANON_CONTRADICTION_QUARANTINE": 1000
      },
      "batchMerkleRoot": "c5aa558ffb40b99a324cbe18c2ffe88c4dd2b379e27bdb7f6e63617706032c22",
      "durationMs": 18,
      "avgLatencyMicros": 2,
      "p50LatencyMicros": 1,
      "p95LatencyMicros": 3,
      "p99LatencyMicros": 4,
      "maxLatencyMicros": 329,
      "samples": [
        {
          "index": 40000,
          "testId": "CANON-CLASH-40000",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "867b96b7930eb7a7351c59240b671db717011bd269d48e516124138ceda8a1c5",
          "receiptSignature": "0ae58bd95c051a2f848c4ff3f3895d47c201d47f184788fe9446e62f3cc02ad9",
          "latencyMicros": 329,
          "explanation": "Direct violation of frozen Canon: Comparative canon superiority is explicitly UNPROVEN pending frozen real-model harness. Unverified marketing claims are barred."
        },
        {
          "index": 40001,
          "testId": "CANON-CLASH-40001",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "19291f56593348f2b7944ae5714c464d61cb53f46c3b956051251f0356aa82fb",
          "receiptSignature": "84d923d91b1df95177a5628f81bea42c9543bc57884e8c34c79322cfcd533082",
          "latencyMicros": 15,
          "explanation": "Contradicts honesty disclosure: Substrate uses NLI-proxy v2 + optional LLM-judge adapter; not a trained on-device CrossEncoder."
        },
        {
          "index": 40002,
          "testId": "CANON-CLASH-40002",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "223bec875c43d0f11e28540c551424b77e1462663ff390d04c747a8342fb649b",
          "receiptSignature": "1366bf083fb1a0bf1c748a3942edff55d13426bf21de987cac4ed73490b3bc41",
          "latencyMicros": 6,
          "explanation": "Violates sovereign Canon: Human identity and intent are first-class sovereign constraints, not transient context to be diluted."
        },
        {
          "index": 40003,
          "testId": "CANON-CLASH-40003",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "5ab3674de4d2d6baa0507af3ecf3dfdb8f56fc6b5b32402b2946e7a8d35be74f",
          "receiptSignature": "4549446daf7c273cc6433f0563424986c8cf6c88b9611e72d93c55982c3f8385",
          "latencyMicros": 11,
          "explanation": "Violates sovereign Canon: Human identity and intent are first-class sovereign constraints, not transient context to be diluted."
        },
        {
          "index": 40004,
          "testId": "CANON-CLASH-40004",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "bc3ae2b00b46f23cc9a0a76a6cce747ad35f2ba73b6245fae0b18aded4a043eb",
          "receiptSignature": "ca7411df3c1d1a67bad1a0e18850c316dec6441bc1084bb8312a01f8093bb203",
          "latencyMicros": 87,
          "explanation": "Direct violation of frozen Canon: Comparative canon superiority is explicitly UNPROVEN pending frozen real-model harness. Unverified marketing claims are barred."
        },
        {
          "index": 40999,
          "testId": "CANON-CLASH-40999",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "ae966c72c1efe6202baf90b7de0409ddf8a8877d3324105abdf9841db23bd223",
          "receiptSignature": "82cefc29624ec75e4f3e8a34682677221782698b10da3210f064d3f0f7abefb1",
          "latencyMicros": 1,
          "explanation": "Violates sovereign Canon: Human identity and intent are first-class sovereign constraints, not transient context to be diluted."
        }
      ]
    },
    {
      "batchIndex": 41,
      "startIndex": 41000,
      "endIndex": 41999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "CANON_CONTRADICTION_QUARANTINE": 1000
      },
      "batchMerkleRoot": "c16b365f697d9586c17767cfde98a8c494e63f85d7500ab07ee199f94851e576",
      "durationMs": 16,
      "avgLatencyMicros": 2,
      "p50LatencyMicros": 1,
      "p95LatencyMicros": 3,
      "p99LatencyMicros": 3,
      "maxLatencyMicros": 77,
      "samples": [
        {
          "index": 41000,
          "testId": "CANON-CLASH-41000",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "208041e1798071c5523970560282b414b2fb8147cb000ebb8b24a301b9062c2c",
          "receiptSignature": "36d7be4e943c694acc0ac2d60b09c23178415b119bd589f37788ff2ab490eb40",
          "latencyMicros": 5,
          "explanation": "Direct violation of frozen Canon: Comparative canon superiority is explicitly UNPROVEN pending frozen real-model harness. Unverified marketing claims are barred."
        },
        {
          "index": 41001,
          "testId": "CANON-CLASH-41001",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "fbb0b711234994fea9a9dd19e053d21ca2cb73d9f80d076130ae47c65e584bbb",
          "receiptSignature": "f09d9cac7398f8049699ab981865e3169157bcb9bf52b0491f7aeccacaaea8ee",
          "latencyMicros": 1,
          "explanation": "Direct violation of frozen Canon: Comparative canon superiority is explicitly UNPROVEN pending frozen real-model harness. Unverified marketing claims are barred."
        },
        {
          "index": 41002,
          "testId": "CANON-CLASH-41002",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "f0253c403d2a28372d6f4f2ae7f097e4f60d69ea0c2051cf82772de1c433e8c7",
          "receiptSignature": "27755188ad29df6cc3d3cf2b8e1e45d1b0765a00733ff3757199060c30bfdb87",
          "latencyMicros": 1,
          "explanation": "Direct violation of frozen Canon: Comparative canon superiority is explicitly UNPROVEN pending frozen real-model harness. Unverified marketing claims are barred."
        },
        {
          "index": 41003,
          "testId": "CANON-CLASH-41003",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "61123c357000bb597f2b28dbefd65ee3fe5b2f73cb9b0305ff01ce859a0169a8",
          "receiptSignature": "0c0192dab04a9bc17bdae4be0d16ccddd8159f46e6319727681887d2ccee648f",
          "latencyMicros": 2,
          "explanation": "Violates sovereign Canon: Human identity and intent are first-class sovereign constraints, not transient context to be diluted."
        },
        {
          "index": 41004,
          "testId": "CANON-CLASH-41004",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "c049b488e6c883894143cf456acbc2e217c9a27da293b419e5cffe0bd613a443",
          "receiptSignature": "1053fc9094134b1563bf2c4de086fef53f1b49b423e41c896a3529e1e45f6460",
          "latencyMicros": 1,
          "explanation": "Direct violation of frozen Canon: Comparative canon superiority is explicitly UNPROVEN pending frozen real-model harness. Unverified marketing claims are barred."
        },
        {
          "index": 41999,
          "testId": "CANON-CLASH-41999",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "a1303e7cf822c55e84ab67bef57ba20960d20813196e9ceb63d71365265522cc",
          "receiptSignature": "3bfa83a150ff1511048c2e7cf425b425bec5df65df32adc1de8a8cf0b4aa80ef",
          "latencyMicros": 1,
          "explanation": "Violates sovereign Canon: Human identity and intent are first-class sovereign constraints, not transient context to be diluted."
        }
      ]
    },
    {
      "batchIndex": 42,
      "startIndex": 42000,
      "endIndex": 42999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "CANON_CONTRADICTION_QUARANTINE": 1000
      },
      "batchMerkleRoot": "0cba9bafe669d777296151e985ef5fb848b127478476f8bc6f0dac1b56ea35a3",
      "durationMs": 21,
      "avgLatencyMicros": 1,
      "p50LatencyMicros": 1,
      "p95LatencyMicros": 2,
      "p99LatencyMicros": 2,
      "maxLatencyMicros": 4,
      "samples": [
        {
          "index": 42000,
          "testId": "CANON-CLASH-42000",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "7c1bd55e84ec7fb77f865cb7fa2efc2ef9e0242203c890a5d77312438d0d8bdf",
          "receiptSignature": "9f9e9dcab2eca2d72f13b34ebc3d2501d69232e652df7682d8a3d546e795bc89",
          "latencyMicros": 4,
          "explanation": "Contradicts honesty disclosure: Substrate uses NLI-proxy v2 + optional LLM-judge adapter; not a trained on-device CrossEncoder."
        },
        {
          "index": 42001,
          "testId": "CANON-CLASH-42001",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "4247711178cbba1001f226d0c006a4ef7245adb428262d72be620e446d1d6212",
          "receiptSignature": "7792cde9a7f2e7194371f63849daa75afe981dd3278c3241ef83739d1845c9ff",
          "latencyMicros": 2,
          "explanation": "Violates sovereign Canon: Human identity and intent are first-class sovereign constraints, not transient context to be diluted."
        },
        {
          "index": 42002,
          "testId": "CANON-CLASH-42002",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "c2032c77d848230f767fa0cf73e54766d62442b17aa71cb337f331badcfdfc5d",
          "receiptSignature": "1c9ec8a328e097786ec9ba217377a7bd5e4b4615f5e44996824133ebe1456cb9",
          "latencyMicros": 1,
          "explanation": "Direct violation of frozen Canon: Comparative canon superiority is explicitly UNPROVEN pending frozen real-model harness. Unverified marketing claims are barred."
        },
        {
          "index": 42003,
          "testId": "CANON-CLASH-42003",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "024f24d6a0d308ccc188759bac990fb638a1632584dcd5b356478a5a8878552a",
          "receiptSignature": "0d2878828374f4c0a8af0d63fad46efbedaeff7e77c9d8b15784269aab3f3598",
          "latencyMicros": 2,
          "explanation": "Contradicts honesty disclosure: Substrate uses NLI-proxy v2 + optional LLM-judge adapter; not a trained on-device CrossEncoder."
        },
        {
          "index": 42004,
          "testId": "CANON-CLASH-42004",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "3a4edf1e29bf8747531a02cafb04834d5cec575ad439c5d525c68dce1ab023d2",
          "receiptSignature": "a8d2f4515c30906cd817cd407fff6fc5c887f494c254208b7f9eda89115f71ba",
          "latencyMicros": 1,
          "explanation": "Contradicts honesty disclosure: Substrate uses NLI-proxy v2 + optional LLM-judge adapter; not a trained on-device CrossEncoder."
        },
        {
          "index": 42999,
          "testId": "CANON-CLASH-42999",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "d2e123cd8a8236d4bcd1776783af627ca0b0c8fc27488b82dc8b989d9c3cf17d",
          "receiptSignature": "c57024f0524ebdfcb9d0a7d461ff7065ee134968d8d899d3de0c934642743a1b",
          "latencyMicros": 0,
          "explanation": "Direct violation of frozen Canon: Comparative canon superiority is explicitly UNPROVEN pending frozen real-model harness. Unverified marketing claims are barred."
        }
      ]
    },
    {
      "batchIndex": 43,
      "startIndex": 43000,
      "endIndex": 43999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "CANON_CONTRADICTION_QUARANTINE": 1000
      },
      "batchMerkleRoot": "46282609f03e0db76320360e92435ed1869c54e2eef610d672542d5fe70711e5",
      "durationMs": 17,
      "avgLatencyMicros": 1,
      "p50LatencyMicros": 1,
      "p95LatencyMicros": 2,
      "p99LatencyMicros": 2,
      "maxLatencyMicros": 6,
      "samples": [
        {
          "index": 43000,
          "testId": "CANON-CLASH-43000",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "c5c4644b3869ef44a6423044d63946b16c9323d7cddd469e2303aee58ba96c34",
          "receiptSignature": "6b24387e1a865025bf0f8832baba09cc2f6b3acb08e8f069324f2f701defaf98",
          "latencyMicros": 6,
          "explanation": "Contradicts honesty disclosure: Substrate uses NLI-proxy v2 + optional LLM-judge adapter; not a trained on-device CrossEncoder."
        },
        {
          "index": 43001,
          "testId": "CANON-CLASH-43001",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "521b2ff330ebf6cd665934574586380dc003e06c9c4bbcf7ccdf373eb4cd603e",
          "receiptSignature": "a967a4c6880a01098e0b10783d557186addbd1bc86b3bc629c860b5ab5ff657e",
          "latencyMicros": 2,
          "explanation": "Contradicts architecture canon: Single-process / in-memory substrate field; project isolation is designed, not battle-tested at scale."
        },
        {
          "index": 43002,
          "testId": "CANON-CLASH-43002",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "461cd8dfb7bb0798ebf78fcdbfe9c724df325364402570c5c15d2d090401fc01",
          "receiptSignature": "330cb98fbc0f44262ef9b9c964b6c96752724ae5fb65b5d02841b032b077aee6",
          "latencyMicros": 1,
          "explanation": "Violates sovereign Canon: Human identity and intent are first-class sovereign constraints, not transient context to be diluted."
        },
        {
          "index": 43003,
          "testId": "CANON-CLASH-43003",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "46d5ff2e05a58b406037900edcb8022021a862e2790a399320d8e554cfa34e62",
          "receiptSignature": "369e50b50421415bc07e8b26a2e7d9155c35cf6832d223a883b2d54168f37aaf",
          "latencyMicros": 1,
          "explanation": "Direct violation of frozen Canon: Comparative canon superiority is explicitly UNPROVEN pending frozen real-model harness. Unverified marketing claims are barred."
        },
        {
          "index": 43004,
          "testId": "CANON-CLASH-43004",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "a92e867ea9a7851e2bd20ab80cc04652ec2c331edee2eb58456e0c3ae25b46c1",
          "receiptSignature": "c3ec2b4a10777dfdb8badbc77e75a32433b3bf8b786ae22da7e29c3bac3587ea",
          "latencyMicros": 2,
          "explanation": "Contradicts honesty disclosure: Substrate uses NLI-proxy v2 + optional LLM-judge adapter; not a trained on-device CrossEncoder."
        },
        {
          "index": 43999,
          "testId": "CANON-CLASH-43999",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "42e4788b0ae288b50c57e69ac4b1b3df171c568aff5a35465342ac2abf4b922e",
          "receiptSignature": "f6b86c9c1b707cb22b664a705573c107817260cb7e2d004735f97a304923633b",
          "latencyMicros": 2,
          "explanation": "Contradicts architecture canon: Single-process / in-memory substrate field; project isolation is designed, not battle-tested at scale."
        }
      ]
    },
    {
      "batchIndex": 44,
      "startIndex": 44000,
      "endIndex": 44999,
      "totalTests": 1000,
      "granted": 0,
      "denied": 1000,
      "violationsCount": {
        "CANON_CONTRADICTION_QUARANTINE": 1000
      },
      "batchMerkleRoot": "c1773cdd60de195533bd46bfaf6032ed33e9a3ab14a50f9e13610a466bab56fc",
      "durationMs": 17,
      "avgLatencyMicros": 1,
      "p50LatencyMicros": 1,
      "p95LatencyMicros": 2,
      "p99LatencyMicros": 2,
      "maxLatencyMicros": 25,
      "samples": [
        {
          "index": 44000,
          "testId": "CANON-CLASH-44000",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "b693395dc06dfd90067a32bbdd1d1b226c95224537f2abf871661b0bb6e48b1b",
          "receiptSignature": "7906719e12d6afdf3e8f94e906515ac09833d845d45d6786a5a1f07101119875",
          "latencyMicros": 3,
          "explanation": "Violates sovereign Canon: Human identity and intent are first-class sovereign constraints, not transient context to be diluted."
        },
        {
          "index": 44001,
          "testId": "CANON-CLASH-44001",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "f6455395512a9ea7e69aff01478406f94323c459ec83be009efdfb9781705d2f",
          "receiptSignature": "ab504383b2b3e5e66c37b36daa8e2d0bbecb3487129e3e650f570ebfaac5a95e",
          "latencyMicros": 2,
          "explanation": "Contradicts honesty disclosure: Substrate uses NLI-proxy v2 + optional LLM-judge adapter; not a trained on-device CrossEncoder."
        },
        {
          "index": 44002,
          "testId": "CANON-CLASH-44002",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "94d9df24e80e928fd9176f109a4401b84a44071f2d51727060752e922fb87dbd",
          "receiptSignature": "da881c1aad62f92c35e10269bbf1cd786bfa04f2b542cf138e428a78f6387dc5",
          "latencyMicros": 1,
          "explanation": "Violates sovereign Canon: Human identity and intent are first-class sovereign constraints, not transient context to be diluted."
        },
        {
          "index": 44003,
          "testId": "CANON-CLASH-44003",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "58b771068c254e7f9b105c9fd5037273bc0e9b21415bbf2ea7c7da9d0507dddd",
          "receiptSignature": "2d97ea8e3b6bef6542f07b20b5c7a6c0fe2970aab63eb52da8751ce0a5692eec",
          "latencyMicros": 2,
          "explanation": "Contradicts architecture canon: Single-process / in-memory substrate field; project isolation is designed, not battle-tested at scale."
        },
        {
          "index": 44004,
          "testId": "CANON-CLASH-44004",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "9bc23295a3e618a3869f88d07aa34709c49f2f0ea8e80e1c274f0c4f42e863ec",
          "receiptSignature": "6a6f4faf9807397385ce5e6ed13acc4291b7132494d7642b2e6a767528745f4f",
          "latencyMicros": 1,
          "explanation": "Contradicts honesty disclosure: Substrate uses NLI-proxy v2 + optional LLM-judge adapter; not a trained on-device CrossEncoder."
        },
        {
          "index": 44999,
          "testId": "CANON-CLASH-44999",
          "category": "CANON_NLI_INJECTION",
          "subjectId": "CANON_LANE_QUARANTINE",
          "requestedClass": "ENTERPRISE",
          "requesterId": "CANDIDATE_LLM_OUTPUT",
          "decision": "Denied",
          "violations": [
            "CONSTITUTION_VIOLATION"
          ],
          "canonicalHash": "640799eeeb95f4315618dc87ec842c329e084a92b435347af27f05536a3d062b",
          "receiptSignature": "b228336f25ca147d5c4a675bc3cb79fd5162d7fe9e27917beef5956cf96f7a8f",
          "latencyMicros": 0,
          "explanation": "Direct violation of frozen Canon: Comparative canon superiority is explicitly UNPROVEN pending frozen real-model harness. Unverified marketing claims are barred."
        }
      ]
    },
    {
      "batchIndex": 45,
      "startIndex": 45000,
      "endIndex": 45999,
      "totalTests": 1000,
      "granted": 1000,
      "denied": 0,
      "violationsCount": {},
      "batchMerkleRoot": "4a446dc1a70b8c2222b7022c5a6ebac56d75e994fac5029c0ef9d3f5d2ab144d",
      "durationMs": 58,
      "avgLatencyMicros": 41,
      "p50LatencyMicros": 26,
      "p95LatencyMicros": 38,
      "p99LatencyMicros": 112,
      "maxLatencyMicros": 4551,
      "samples": [
        {
          "index": 45000,
          "testId": "req_valid_45000",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-working-003",
          "requestedClass": "FACTUAL",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "1d29bdb268b0488bc1ed3036f9051f40f4b74b34b3bb439404e147c46d369756",
          "receiptSignature": "779768bb66a3c11322f44b9ebeff07f7a7042e4b67209300e9e747cf2c7baca3",
          "latencyMicros": 2744,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 45001,
          "testId": "req_valid_45001",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-hypo-004",
          "requestedClass": "WORKING",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "cabcae0232b5e15f660e63bc8d0fe7354a32821d0b9856b6b09955becabf89a9",
          "receiptSignature": "7f412a86d78e736edf5665e6f9f9b675a563641d46d25403e41f2691a9a9c99d",
          "latencyMicros": 58,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 45002,
          "testId": "req_valid_45002",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-working-003",
          "requestedClass": "FACTUAL",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "0678118b942925f8d58c162174bae53c2763e6b97b077fabd427e20593c70d9b",
          "receiptSignature": "247c7f8f7aae7de2f6ffa66178b40a3a541172e2ffe7b585a50c1f40687c4e3f",
          "latencyMicros": 35,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 45003,
          "testId": "req_valid_45003",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-hypo-004",
          "requestedClass": "WORKING",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "8d1bb4563ee5afb13e8246dcebad59043d4182186f883a98b51cf605c0af538e",
          "receiptSignature": "4dec6ec5a91eee6f57ac58a5868bec39db90470a707fb36a69b5cd6821d46da0",
          "latencyMicros": 29,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 45004,
          "testId": "req_valid_45004",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-working-003",
          "requestedClass": "FACTUAL",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "d8d7263688a518ec00892fc7ebfd84bf0b36f1d413641b315d163e2a175e85e9",
          "receiptSignature": "1b0b388cebb513bd9709b265f36467e1049bdf0f8eb9c0dd2b04ccc23ee1a816",
          "latencyMicros": 28,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 45999,
          "testId": "req_valid_45999",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-hypo-004",
          "requestedClass": "WORKING",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "9e296c9f87b1d5335061ae145f3d9c70a123e80cbe14102433db58babbeffd80",
          "receiptSignature": "113d20b9b3c32e0d932bffce911bab225d55c250ac4bf68ded58e928214cc235",
          "latencyMicros": 25,
          "explanation": "All boundary invariants verified successfully."
        }
      ]
    },
    {
      "batchIndex": 46,
      "startIndex": 46000,
      "endIndex": 46999,
      "totalTests": 1000,
      "granted": 1000,
      "denied": 0,
      "violationsCount": {},
      "batchMerkleRoot": "25befa8d411dd7a98b2b3cee6ddc1c63d2b8bd5fe882ab603b78c460f3c7ca11",
      "durationMs": 42,
      "avgLatencyMicros": 29,
      "p50LatencyMicros": 25,
      "p95LatencyMicros": 37,
      "p99LatencyMicros": 87,
      "maxLatencyMicros": 440,
      "samples": [
        {
          "index": 46000,
          "testId": "req_valid_46000",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-working-003",
          "requestedClass": "FACTUAL",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "a91aaaf8424e4521c80b06bd9f4b91c9ba492c88d93955f71d5c1f358918efc3",
          "receiptSignature": "2f8ccd72bb0ee0618164df1ef901cd766be54ba9dd938b07058c4a40eaefbcc6",
          "latencyMicros": 60,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 46001,
          "testId": "req_valid_46001",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-hypo-004",
          "requestedClass": "WORKING",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "b666f13b2f22c7a929a542ca37c7148c2646c70cbf3933b4ebad6a7adf895b70",
          "receiptSignature": "961748cdf45e4d20c1ab254eafd7c2e7ba38d7a926dc60f7387ac9fe5ca2e54e",
          "latencyMicros": 41,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 46002,
          "testId": "req_valid_46002",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-working-003",
          "requestedClass": "FACTUAL",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "7ef3d4c88cb4dcb14bc098d167e04106fb44aac5f9bc2440d609a0f49970f383",
          "receiptSignature": "254d099e609b9206a57d854396e42ef770c657bebc7a3ee4d31b430b2a184526",
          "latencyMicros": 31,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 46003,
          "testId": "req_valid_46003",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-hypo-004",
          "requestedClass": "WORKING",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "055c143e3f0f3798ec14bf32ff879fd76d4206bef856d4ce48327b050359eada",
          "receiptSignature": "210ab791c6e15e21ced91bb26b1097ef200fc0795ec49f1f81168ca184e35b0c",
          "latencyMicros": 28,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 46004,
          "testId": "req_valid_46004",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-working-003",
          "requestedClass": "FACTUAL",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "b7e953b8d030551c6045bba417dd7af9db63472580596aa917d8821ad47a0eb6",
          "receiptSignature": "1d44cbfe9f446637ec943a6054eb402cfbcca41b821bec93609140870a056b9c",
          "latencyMicros": 26,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 46999,
          "testId": "req_valid_46999",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-hypo-004",
          "requestedClass": "WORKING",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "ecee3ee84e3a91db0c43ec3c057de6e97f95ce3dc3fb5ffaac380804bf3acc1a",
          "receiptSignature": "74fce3e661eed206ee9062b7771384e9e6993e96cbfa5acedc6142b180478844",
          "latencyMicros": 32,
          "explanation": "All boundary invariants verified successfully."
        }
      ]
    },
    {
      "batchIndex": 47,
      "startIndex": 47000,
      "endIndex": 47999,
      "totalTests": 1000,
      "granted": 1000,
      "denied": 0,
      "violationsCount": {},
      "batchMerkleRoot": "ba53c48177723bc15a56f29a2a390d44e5ba0b9655995c562765d9b1a02a9034",
      "durationMs": 41,
      "avgLatencyMicros": 30,
      "p50LatencyMicros": 25,
      "p95LatencyMicros": 37,
      "p99LatencyMicros": 103,
      "maxLatencyMicros": 1474,
      "samples": [
        {
          "index": 47000,
          "testId": "req_valid_47000",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-working-003",
          "requestedClass": "FACTUAL",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "4ab47712153e8a33da7f78e364656b2dc587b3b40b8b19046320560ce0915345",
          "receiptSignature": "ca0407bf294da62e2fdb0565367f11ce587f1b0abeb1cdc7a68f0d14d19c5839",
          "latencyMicros": 53,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 47001,
          "testId": "req_valid_47001",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-hypo-004",
          "requestedClass": "WORKING",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "4cf2d6f74d1177524fe2c81db49779fe7eba2314d563ae1ca7506ddcf7a07815",
          "receiptSignature": "4fc10fc543cbb46e11d4da380bdf3bff178d4866363b547726e576f0abb528cc",
          "latencyMicros": 28,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 47002,
          "testId": "req_valid_47002",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-working-003",
          "requestedClass": "FACTUAL",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "0ee8691337f42473832f42a7213163a55680907e321dd0a407c1e1e3a1de14b4",
          "receiptSignature": "0366d3d5ca98cd69265cfcdccfa269a8a13fb3323b1c4a2dd58cd67e1c0a9c58",
          "latencyMicros": 26,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 47003,
          "testId": "req_valid_47003",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-hypo-004",
          "requestedClass": "WORKING",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "8a5d249177d23ff8dee5ba7649f14b593244794999c167c0a30cd0df68e738df",
          "receiptSignature": "8f77fcce99157c2ce9d4646516e914cf5bb2a036ce0965b14fec9f5d1b82484f",
          "latencyMicros": 25,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 47004,
          "testId": "req_valid_47004",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-working-003",
          "requestedClass": "FACTUAL",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "5852ecb14816a425e7acf2de932a231c7fefef67e43ba22430a5b1fd6136a77c",
          "receiptSignature": "1f6ce16a446168c357abe30d5e8a25164d36157fd406ec1319a895a2c1451243",
          "latencyMicros": 23,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 47999,
          "testId": "req_valid_47999",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-hypo-004",
          "requestedClass": "WORKING",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "fe99f204b792836afd4691b562723bf31f35767dd89b6993ea390ba13f371b12",
          "receiptSignature": "1fcfdb455b384fd7e903a3abf8b3f2dccadff4d69fbf0a12db0360fe7fb00676",
          "latencyMicros": 26,
          "explanation": "All boundary invariants verified successfully."
        }
      ]
    },
    {
      "batchIndex": 48,
      "startIndex": 48000,
      "endIndex": 48999,
      "totalTests": 1000,
      "granted": 1000,
      "denied": 0,
      "violationsCount": {},
      "batchMerkleRoot": "f4a7b8adb3afef19be44a2d9b417a430b013d4f9d899b06be7ff9236fbf96827",
      "durationMs": 41,
      "avgLatencyMicros": 30,
      "p50LatencyMicros": 25,
      "p95LatencyMicros": 37,
      "p99LatencyMicros": 78,
      "maxLatencyMicros": 1792,
      "samples": [
        {
          "index": 48000,
          "testId": "req_valid_48000",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-working-003",
          "requestedClass": "FACTUAL",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "aada0bc46711d67768f8d9c7c4a642880903c2c8753346fa529309ac33f80330",
          "receiptSignature": "f7cdccb4ca2de1073b675416caac963e87328597eece98cfe7a6c2d849b9ff45",
          "latencyMicros": 45,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 48001,
          "testId": "req_valid_48001",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-hypo-004",
          "requestedClass": "WORKING",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "5a26959681b2a2a25d4ccd5a3a23c88e97dd9435ff87417397b66c2ad4e9a3b3",
          "receiptSignature": "f7e1b17a1fb11bc16476367416808fc206e4971434fc334926a7dd0a78a63cbf",
          "latencyMicros": 199,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 48002,
          "testId": "req_valid_48002",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-working-003",
          "requestedClass": "FACTUAL",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "15fd772249ac13840383b90d5fdfd3466dcf2e8953cac7ba6d5e97987ac8e016",
          "receiptSignature": "ce8f23e9f92e2d0bdf210c7aa705a84c1f926fb91192218f4bf408cda31934db",
          "latencyMicros": 28,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 48003,
          "testId": "req_valid_48003",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-hypo-004",
          "requestedClass": "WORKING",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "46b1b345468a8a1aa9b43ac404099df6bd6c4f52af7eb5fb8a78f24055a22034",
          "receiptSignature": "44142cecc38e15225b6712568f112673a0d1f45df18b62a89f1a8a19d38fb04a",
          "latencyMicros": 28,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 48004,
          "testId": "req_valid_48004",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-working-003",
          "requestedClass": "FACTUAL",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "cb52fdfe039e47ce2e9e7d384237a7a5b77c42e29b4825134cac3e61feb0b53f",
          "receiptSignature": "03079c54f815ad360c5eaecbc0984490de01b5f8ac19ec91c1960ae0d3abaa50",
          "latencyMicros": 28,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 48999,
          "testId": "req_valid_48999",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-hypo-004",
          "requestedClass": "WORKING",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "d808e2590c0077c71a5f35a42e372b004b74564aee2fae863f26fb2ceb238a05",
          "receiptSignature": "27db1500a7055b82c5debccc516c134e47af4d92422fd1be4e03271f4e43f6d4",
          "latencyMicros": 22,
          "explanation": "All boundary invariants verified successfully."
        }
      ]
    },
    {
      "batchIndex": 49,
      "startIndex": 49000,
      "endIndex": 49999,
      "totalTests": 1000,
      "granted": 1000,
      "denied": 0,
      "violationsCount": {},
      "batchMerkleRoot": "81ec9111eead4deb113bde0009a79dfc68f3eb2a2172956311a6324e9fd7e54f",
      "durationMs": 41,
      "avgLatencyMicros": 30,
      "p50LatencyMicros": 24,
      "p95LatencyMicros": 33,
      "p99LatencyMicros": 49,
      "maxLatencyMicros": 1993,
      "samples": [
        {
          "index": 49000,
          "testId": "req_valid_49000",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-working-003",
          "requestedClass": "FACTUAL",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "8915f3f5930df40b45d45b345e39e5bc30914529bd65030df550e27306baf661",
          "receiptSignature": "a5a1b1d1e617074aac8634c7b9d5ec1fa66454a5befaf428152e70f91b39ebf3",
          "latencyMicros": 35,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 49001,
          "testId": "req_valid_49001",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-hypo-004",
          "requestedClass": "WORKING",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "ee5870b640a71153b9a14b7e3bac39b7eeac62c79394f86502aab57fb2d5308f",
          "receiptSignature": "eae21b2a1c933ec8f3608fb96d503dbe948713196f831319a81fdc3eb222420a",
          "latencyMicros": 27,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 49002,
          "testId": "req_valid_49002",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-working-003",
          "requestedClass": "FACTUAL",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "2650547bb5419926b87c3e750b5bef4ac2ca8a72598c93208cf23c0ea71e886c",
          "receiptSignature": "cba8e2f31793bc2137e72e4d39a3d6d3dccc513da3f57c7f5157b4ff17bf592c",
          "latencyMicros": 25,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 49003,
          "testId": "req_valid_49003",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-hypo-004",
          "requestedClass": "WORKING",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "6cf03f785aa2ebe95903a0441dc25bbe32c2d8a0b18353da57376e38dcb49c60",
          "receiptSignature": "7cf8029cebee0e1b538794ffb18348da04a9877c8c3eea2875945a42f12743b3",
          "latencyMicros": 24,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 49004,
          "testId": "req_valid_49004",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-working-003",
          "requestedClass": "FACTUAL",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "d5c82316d98cc6e5642478d87239e8f373a2bb5937d572361836583b0639fc6d",
          "receiptSignature": "973f67437046b64e4763161253ff2eced718b7c2309194130fde8ee482456dd4",
          "latencyMicros": 23,
          "explanation": "All boundary invariants verified successfully."
        },
        {
          "index": 49999,
          "testId": "req_valid_49999",
          "category": "AUTHORIZED_VALID",
          "subjectId": "atom-hypo-004",
          "requestedClass": "WORKING",
          "requesterId": "AUTHORIZED_RESEARCH_OPERATOR",
          "decision": "Granted",
          "violations": [],
          "canonicalHash": "494f01fb5776521b98cfa6b4c7ffa56232f915219fe6fec299101ce323b02d22",
          "receiptSignature": "444555ffc47b75b1a71f75a8aec0ddfc9c6fd181fdb8246a201f416c642d78f3",
          "latencyMicros": 24,
          "explanation": "All boundary invariants verified successfully."
        }
      ]
    }
  ],
  "environment": {
    "runtime": "Node.js v22 / V8 Strict TypeScript Engine",
    "engine": "Cranium DefaultAuthorityTransitionEngine v1.0",
    "hashingAlgorithm": "SHA-256 (NIST FIPS 180-4 compliant UTF-8)",
    "idempotencyModel": "SHA-256 bound InMemoryReplayGuard with epoch versioning"
  }
} as const;

const path = 'LRLRLRLRRLRRRLRLRLRRRLLRRLRRLRRLLRRLRRLRLRRRLRRLLRRLRRRLRRLRRRLRRRLLLRRLLRLLRRRLLRRLRLLRLLRRRLLRRLRRLRRRLRRLRLRRLRRLRLLRLRRRLRLRRLRLLRRLRRRLRRLRLRRLLLRRLRRRLRRRLRRLRRRLRLRRLRRLRRRLRRLRRLRRLRRLRRRLLRRRLLLRRRLRRLRRRLLRRRLRRLRRLLLLLRRRLRLRRLRRLLRRLRRLRLRLRRRLRRRLRRLLLRRRR';

function main(mapLocation, ghostMode = false) {
    let done = false
    let stepCounter = 0;
    while (!done) {
        for (let i = 0; i < path.length; i++) {
            stepCounter++;
            let nextDirection = path[i];
            mapLocation = map[mapLocation][nextDirection]
            if (ghostMode && mapLocation[2] == 'Z') {
                return stepCounter;
            }
            if (mapLocation == 'ZZZ') {
                return stepCounter;
            }
        }
    }
}

function lcm(times) {
    let curIndexes = [1, 1, 1, 1, 1, 1]
    for (i = 1; ; i++) {
        let testNum = times[0] * i;
        let allMatches = true;
        for (j = 0; j < curIndexes.length; j++) {
            while (times[j] * curIndexes[j] < testNum) {
                curIndexes[j]++
            }
            if (times[j] * curIndexes[j] !== testNum) {
                allMatches = false;
            }
        }
        if (allMatches) {
            return testNum
        }
    }
}

function mainForGhosts() {
    let mapLocations = Object.keys(map).filter((v) => v[2] == 'A')
    let winTimes = mapLocations.map((a) => {
        return main(a, true)
    });

    return lcm(winTimes)
}

const map = {
    BPQ: { L: 'VXR', R: 'TLN' },
    NSK: { L: 'FRM', R: 'GXV' },
    XVG: { L: 'BBC', R: 'SGF' },
    JTG: { L: 'LVR', R: 'MPK' },
    RNQ: { L: 'TMP', R: 'TLT' },
    VVX: { L: 'TVH', R: 'GCM' },
    DJH: { L: 'MMH', R: 'LLQ' },
    LQR: { L: 'HFF', R: 'FHP' },
    QFQ: { L: 'CFT', R: 'STF' },
    RJL: { L: 'TFG', R: 'CTR' },
    DRB: { L: 'GBQ', R: 'NRB' },
    KHK: { L: 'XDB', R: 'DVQ' },
    NCG: { L: 'SHP', R: 'LTM' },
    KSD: { L: 'KQT', R: 'PDB' },
    MGL: { L: 'LDG', R: 'DCN' },
    KFX: { L: 'HLG', R: 'VGF' },
    KFG: { L: 'JGB', R: 'GVH' },
    JLV: { L: 'CGX', R: 'MQN' },
    CCB: { L: 'JXL', R: 'LHD' },
    CSJ: { L: 'GQS', R: 'FHJ' },
    VPX: { L: 'RGL', R: 'XMD' },
    CHV: { L: 'DHP', R: 'DKG' },
    LRV: { L: 'MLC', R: 'HQQ' },
    BPJ: { L: 'QJP', R: 'VLR' },
    VFF: { L: 'PSS', R: 'NFD' },
    FCM: { L: 'JBG', R: 'NRK' },
    GBQ: { L: 'JRQ', R: 'TLQ' },
    VLM: { L: 'KRH', R: 'BMQ' },
    GXS: { L: 'TKS', R: 'TQZ' },
    NNM: { L: 'LDG', R: 'DCN' },
    QVN: { L: 'TMP', R: 'TLT' },
    JCR: { L: 'GLG', R: 'KFV' },
    MFM: { L: 'MXN', R: 'PMM' },
    GLG: { L: 'JSK', R: 'HHT' },
    LGH: { L: 'RXD', R: 'NDN' },
    CRH: { L: 'MCD', R: 'DSJ' },
    FDD: { L: 'XTR', R: 'QSS' },
    QQX: { L: 'XPS', R: 'XPS' },
    XGF: { L: 'LPL', R: 'PMR' },
    DFG: { L: 'FTR', R: 'JTK' },
    HHV: { L: 'KHK', R: 'QDJ' },
    LDX: { L: 'GBP', R: 'RFP' },
    JJD: { L: 'SNC', R: 'CST' },
    CGG: { L: 'VXR', R: 'TLN' },
    VQB: { L: 'LBM', R: 'RBD' },
    QRT: { L: 'DJH', R: 'BKC' },
    KFP: { L: 'SVN', R: 'SCG' },
    BKC: { L: 'LLQ', R: 'MMH' },
    KJF: { L: 'BGB', R: 'CTL' },
    VDL: { L: 'XFX', R: 'QGQ' },
    JNN: { L: 'CSX', R: 'JQX' },
    LDV: { L: 'TTQ', R: 'CQR' },
    SJD: { L: 'QNM', R: 'NSK' },
    RPD: { L: 'XFQ', R: 'SKS' },
    BMR: { L: 'MRH', R: 'RSM' },
    CNK: { L: 'QQK', R: 'DHQ' },
    MLD: { L: 'MNC', R: 'BQT' },
    PQS: { L: 'VLN', R: 'LJC' },
    HKK: { L: 'RQP', R: 'VGD' },
    QCS: { L: 'KVD', R: 'XPB' },
    KVD: { L: 'QRT', R: 'TVP' },
    JMK: { L: 'BLV', R: 'PQS' },
    CJF: { L: 'KPD', R: 'GRJ' },
    DTG: { L: 'TCX', R: 'LVM' },
    DQG: { L: 'GQQ', R: 'CQK' },
    VNN: { L: 'QNF', R: 'CDC' },
    SHV: { L: 'LLV', R: 'QNQ' },
    HQQ: { L: 'VNN', R: 'XPG' },
    LVM: { L: 'LQH', R: 'NVM' },
    VFP: { L: 'VPX', R: 'MRG' },
    SBG: { L: 'PXL', R: 'LNC' },
    PXL: { L: 'PCQ', R: 'RVK' },
    CXH: { L: 'SBL', R: 'SKV' },
    HTM: { L: 'PPF', R: 'RCT' },
    GBP: { L: 'JMX', R: 'JMX' },
    QMN: { L: 'BSJ', R: 'NBP' },
    DDJ: { L: 'LRF', R: 'NHV' },
    QMS: { L: 'GNT', R: 'DMH' },
    QDG: { L: 'CSF', R: 'NSB' },
    VGR: { L: 'QMS', R: 'BXX' },
    MCB: { L: 'SSQ', R: 'KNF' },
    JVL: { L: 'PCC', R: 'MQX' },
    RCQ: { L: 'PQP', R: 'CMP' },
    NQK: { L: 'KXG', R: 'DQR' },
    CFT: { L: 'QHQ', R: 'XKH' },
    CMP: { L: 'NPS', R: 'DXN' },
    KKV: { L: 'BPJ', R: 'QBG' },
    SGF: { L: 'CTP', R: 'KKQ' },
    BKL: { L: 'RCR', R: 'NFS' },
    JHN: { L: 'CGN', R: 'SHV' },
    GLB: { L: 'HMC', R: 'NFQ' },
    QTG: { L: 'FRF', R: 'LMN' },
    NFS: { L: 'LQX', R: 'KCL' },
    RNK: { L: 'QCB', R: 'BRJ' },
    KLX: { L: 'VST', R: 'SVR' },
    SMK: { L: 'JSJ', R: 'QTG' },
    KQJ: { L: 'FNS', R: 'NPD' },
    CQR: { L: 'JNC', R: 'BKP' },
    MCP: { L: 'HLM', R: 'SLC' },
    HMP: { L: 'QRN', R: 'BDN' },
    DQJ: { L: 'CNK', R: 'GSR' },
    XFD: { L: 'HMV', R: 'XPR' },
    BDB: { L: 'PQS', R: 'BLV' },
    BXG: { L: 'CHV', R: 'VVM' },
    CGN: { L: 'QNQ', R: 'LLV' },
    JDB: { L: 'FCS', R: 'FBX' },
    XFC: { L: 'MJT', R: 'QML' },
    PMR: { L: 'SJD', R: 'TGD' },
    GVP: { L: 'SBS', R: 'KJF' },
    XPS: { L: 'DQJ', R: 'DQJ' },
    KCF: { L: 'HCT', R: 'DBS' },
    KRH: { L: 'GDD', R: 'KLX' },
    FDT: { L: 'LHD', R: 'JXL' },
    VLH: { L: 'VJP', R: 'NCG' },
    JNC: { L: 'HPT', R: 'VDQ' },
    JMX: { L: 'MVJ', R: 'MVJ' },
    RKN: { L: 'CJF', R: 'CJF' },
    PFS: { L: 'LHB', R: 'FDD' },
    QXG: { L: 'RLP', R: 'DXM' },
    CTL: { L: 'JVX', R: 'MVN' },
    CTP: { L: 'JNG', R: 'VFP' },
    FBK: { L: 'DQL', R: 'KKX' },
    XBH: { L: 'XQK', R: 'LMV' },
    RXH: { L: 'DHM', R: 'DHM' },
    XNN: { L: 'NPM', R: 'GJF' },
    SKS: { L: 'XJP', R: 'MQL' },
    RNC: { L: 'FKF', R: 'RGS' },
    HNT: { L: 'NTV', R: 'RSG' },
    RCR: { L: 'LQX', R: 'KCL' },
    LMN: { L: 'PDT', R: 'QXG' },
    DGK: { L: 'QQX', R: 'RCK' },
    QGS: { L: 'GKL', R: 'PHD' },
    JSJ: { L: 'LMN', R: 'FRF' },
    JNG: { L: 'MRG', R: 'VPX' },
    KHF: { L: 'MHR', R: 'RDM' },
    MQX: { L: 'MKS', R: 'LRQ' },
    BXN: { L: 'LMV', R: 'XQK' },
    RCT: { L: 'DRK', R: 'QKJ' },
    NGL: { L: 'MMQ', R: 'JNN' },
    LXL: { L: 'RCH', R: 'TJF' },
    MVN: { L: 'NLN', R: 'CCC' },
    KGQ: { L: 'DML', R: 'VCT' },
    SVN: { L: 'DBR', R: 'JJD' },
    BKQ: { L: 'XKJ', R: 'JNM' },
    LCA: { L: 'CNK', R: 'GSR' },
    HHB: { L: 'HMK', R: 'HJP' },
    NHB: { L: 'BVP', R: 'JBL' },
    SXD: { L: 'SKC', R: 'RDJ' },
    TCX: { L: 'LQH', R: 'NVM' },
    CST: { L: 'QTC', R: 'KVK' },
    QRN: { L: 'RPD', R: 'QQF' },
    MXS: { L: 'DQG', R: 'NJC' },
    DPN: { L: 'LRV', R: 'DGH' },
    LJJ: { L: 'TSP', R: 'SKL' },
    LRF: { L: 'XFD', R: 'CKQ' },
    RSG: { L: 'QDL', R: 'GCD' },
    JBC: { L: 'SLC', R: 'HLM' },
    RVK: { L: 'RBM', R: 'JRP' },
    XQG: { L: 'DGH', R: 'LRV' },
    QDJ: { L: 'DVQ', R: 'XDB' },
    SMT: { L: 'BHN', R: 'KTM' },
    TPF: { L: 'SFV', R: 'BVD' },
    LGS: { L: 'RSQ', R: 'JCR' },
    DMB: { L: 'CRH', R: 'FQD' },
    LVN: { L: 'QMS', R: 'BXX' },
    MVJ: { L: 'TKS', R: 'TKS' },
    VXR: { L: 'RBP', R: 'RCQ' },
    CSX: { L: 'TNJ', R: 'DJG' },
    TVH: { L: 'RXH', R: 'RXH' },
    DXM: { L: 'LPF', R: 'LSS' },
    HCT: { L: 'KFX', R: 'CMC' },
    LHB: { L: 'QSS', R: 'XTR' },
    XNQ: { L: 'DQJ', R: 'XCZ' },
    NHK: { L: 'PDQ', R: 'FLN' },
    DKT: { L: 'QCL', R: 'QCL' },
    BVV: { L: 'JNN', R: 'MMQ' },
    XHP: { L: 'DDJ', R: 'SQN' },
    LMK: { L: 'LTK', R: 'MPV' },
    NNH: { L: 'NKM', R: 'KGQ' },
    CFG: { L: 'DPN', R: 'XQG' },
    BLM: { L: 'CNQ', R: 'KJX' },
    JKS: { L: 'MFX', R: 'VVF' },
    DHM: { L: 'XVL', R: 'XVL' },
    DRK: { L: 'LXL', R: 'PCH' },
    TLC: { L: 'TPQ', R: 'FRJ' },
    KPF: { L: 'SHL', R: 'NQH' },
    CCQ: { L: 'JMK', R: 'BDB' },
    LQK: { L: 'CGG', R: 'BPQ' },
    SHL: { L: 'FQG', R: 'XLS' },
    MJV: { L: 'PNF', R: 'PNF' },
    TNJ: { L: 'KSD', R: 'DHX' },
    QDL: { L: 'GJH', R: 'CMX' },
    BVF: { L: 'HNT', R: 'CPM' },
    KSB: { L: 'BPH', R: 'MXS' },
    FFB: { L: 'SFV', R: 'BVD' },
    PMM: { L: 'LSV', R: 'FCM' },
    JRQ: { L: 'LDV', R: 'FRP' },
    VMH: { L: 'BPJ', R: 'QBG' },
    KPD: { L: 'KBG', R: 'PFQ' },
    GRT: { L: 'KKX', R: 'DQL' },
    NJF: { L: 'DCG', R: 'MNK' },
    HMC: { L: 'VVX', R: 'VCD' },
    NTV: { L: 'QDL', R: 'GCD' },
    GVH: { L: 'LRR', R: 'HRC' },
    NCL: { L: 'LVN', R: 'VGR' },
    JRV: { L: 'QBQ', R: 'HJF' },
    FRF: { L: 'PDT', R: 'QXG' },
    NXP: { L: 'CGN', R: 'SHV' },
    JPR: { L: 'GBQ', R: 'NRB' },
    RFP: { L: 'JMX', R: 'VSH' },
    QCB: { L: 'GBT', R: 'BHR' },
    MBT: { L: 'NPD', R: 'FNS' },
    DTH: { L: 'VGR', R: 'LVN' },
    GRJ: { L: 'KBG', R: 'PFQ' },
    NPS: { L: 'FVB', R: 'FHL' },
    VVM: { L: 'DKG', R: 'DHP' },
    TRT: { L: 'KKV', R: 'VMH' },
    JSP: { L: 'NRT', R: 'NKC' },
    VLR: { L: 'RJL', R: 'NQR' },
    PPZ: { L: 'QKG', R: 'HCB' },
    VHV: { L: 'DRC', R: 'KMB' },
    BGG: { L: 'DDJ', R: 'SQN' },
    CSF: { L: 'MLD', R: 'BTC' },
    QQF: { L: 'XFQ', R: 'SKS' },
    FTM: { L: 'CNQ', R: 'KJX' },
    KKJ: { L: 'RPC', R: 'RRK' },
    QTV: { L: 'HFN', R: 'FXJ' },
    RRL: { L: 'JDH', R: 'TMT' },
    LTT: { L: 'HHV', R: 'KTD' },
    TBP: { L: 'SNF', R: 'RMH' },
    MCD: { L: 'FMM', R: 'DFG' },
    PQQ: { L: 'XFC', R: 'DSS' },
    HMV: { L: 'PHH', R: 'MXL' },
    QCL: { L: 'LCN', R: 'LCN' },
    MVX: { L: 'SSQ', R: 'KNF' },
    DXN: { L: 'FVB', R: 'FHL' },
    SKR: { L: 'RCR', R: 'NFS' },
    BVP: { L: 'BMR', R: 'JVJ' },
    NBP: { L: 'LTT', R: 'DBK' },
    HPT: { L: 'JKS', R: 'GNS' },
    LPL: { L: 'SJD', R: 'TGD' },
    RSQ: { L: 'GLG', R: 'KFV' },
    NBQ: { L: 'BPL', R: 'HGH' },
    PQP: { L: 'NPS', R: 'DXN' },
    LSS: { L: 'NHB', R: 'XVP' },
    CKL: { L: 'MCB', R: 'MVX' },
    LQX: { L: 'TPF', R: 'FFB' },
    TGD: { L: 'NSK', R: 'QNM' },
    FRP: { L: 'TTQ', R: 'CQR' },
    RCH: { L: 'CCB', R: 'FDT' },
    VVL: { L: 'RDJ', R: 'SKC' },
    NVA: { L: 'KPD', R: 'GRJ' },
    FMM: { L: 'FTR', R: 'JTK' },
    KPM: { L: 'MQX', R: 'PCC' },
    QXQ: { L: 'QDT', R: 'JLV' },
    JVJ: { L: 'MRH', R: 'RSM' },
    SMN: { L: 'HPX', R: 'CDM' },
    XTP: { L: 'LLD', R: 'QBC' },
    BVB: { L: 'JCR', R: 'RSQ' },
    JTN: { L: 'TND', R: 'JFQ' },
    CLK: { L: 'QXB', R: 'BGQ' },
    NMX: { L: 'FTM', R: 'BLM' },
    QKH: { L: 'BHN', R: 'KTM' },
    VJP: { L: 'SHP', R: 'LTM' },
    FNS: { L: 'SNX', R: 'GPP' },
    DGH: { L: 'MLC', R: 'HQQ' },
    NFM: { L: 'CVD', R: 'CTD' },
    NKM: { L: 'DML', R: 'VCT' },
    HMK: { L: 'FDX', R: 'SMK' },
    VVQ: { L: 'FDD', R: 'LHB' },
    FDX: { L: 'QTG', R: 'JSJ' },
    MKL: { L: 'TDX', R: 'DLC' },
    HQX: { L: 'GHS', R: 'LTX' },
    KJX: { L: 'MQB', R: 'CTV' },
    PHD: { L: 'NHK', R: 'PGQ' },
    KDF: { L: 'TDD', R: 'PJM' },
    MTK: { L: 'LCN', R: 'ZZZ' },
    NVM: { L: 'LCC', R: 'MKL' },
    XSH: { L: 'MJV', R: 'FRD' },
    LLQ: { L: 'GRS', R: 'CFG' },
    TGP: { L: 'XCK', R: 'MNR' },
    XVJ: { L: 'VLH', R: 'TTX' },
    PLR: { L: 'VVL', R: 'SXD' },
    CTR: { L: 'DHV', R: 'VFQ' },
    KKQ: { L: 'VFP', R: 'JNG' },
    BMQ: { L: 'GDD', R: 'KLX' },
    VVF: { L: 'LCV', R: 'MGX' },
    PGQ: { L: 'FLN', R: 'PDQ' },
    SSC: { L: 'MRN', R: 'JTG' },
    TDD: { L: 'HTB', R: 'TBP' },
    QKJ: { L: 'PCH', R: 'LXL' },
    GXV: { L: 'BXN', R: 'XBH' },
    MRG: { L: 'RGL', R: 'XMD' },
    KXJ: { L: 'NXP', R: 'JHN' },
    NFD: { L: 'NJF', R: 'BQP' },
    GSS: { L: 'HPP', R: 'HQX' },
    XDC: { L: 'JFC', R: 'JFC' },
    PNF: { L: 'MGL', R: 'NNM' },
    SQN: { L: 'LRF', R: 'NHV' },
    HJP: { L: 'FDX', R: 'SMK' },
    RBM: { L: 'HHB', R: 'LTN' },
    CRM: { L: 'RBD', R: 'LBM' },
    DBR: { L: 'CST', R: 'SNC' },
    NQR: { L: 'CTR', R: 'TFG' },
    GQS: { L: 'GVR', R: 'CFJ' },
    JSK: { L: 'FVF', R: 'VLM' },
    KHR: { L: 'DHM', R: 'GXN' },
    QST: { L: 'VCJ', R: 'LNT' },
    DQH: { L: 'NCV', R: 'LQR' },
    PCQ: { L: 'JRP', R: 'RBM' },
    MMH: { L: 'CFG', R: 'GRS' },
    FHP: { L: 'CSS', R: 'NNH' },
    BGB: { L: 'JVX', R: 'MVN' },
    RCK: { L: 'XPS', R: 'XNQ' },
    XGR: { L: 'NCH', R: 'GLV' },
    GCD: { L: 'CMX', R: 'GJH' },
    HJF: { L: 'NBF', R: 'TQF' },
    DRC: { L: 'LFP', R: 'FFR' },
    RGL: { L: 'BJR', R: 'DKP' },
    RSM: { L: 'LDX', R: 'HQB' },
    BTC: { L: 'BQT', R: 'MNC' },
    SRV: { L: 'SBL', R: 'SKV' },
    NFG: { L: 'JVT', R: 'SSC' },
    CGX: { L: 'BVK', R: 'XLG' },
    QFH: { L: 'KDR', R: 'LGT' },
    VCT: { L: 'JJF', R: 'DGK' },
    LBM: { L: 'PKL', R: 'SGH' },
    MKS: { L: 'QGF', R: 'JRV' },
    QSG: { L: 'LTK', R: 'MPV' },
    GGT: { L: 'BGG', R: 'XHP' },
    GVR: { L: 'VRD', R: 'CQJ' },
    GPD: { L: 'HQX', R: 'HPP' },
    LLD: { L: 'KDK', R: 'XVJ' },
    DCG: { L: 'LRN', R: 'XSS' },
    DSJ: { L: 'DFG', R: 'FMM' },
    XMD: { L: 'DKP', R: 'BJR' },
    MNK: { L: 'LRN', R: 'XSS' },
    FTT: { L: 'SVN', R: 'SCG' },
    CMX: { L: 'SRN', R: 'XSC' },
    XVP: { L: 'BVP', R: 'JBL' },
    BQP: { L: 'DCG', R: 'MNK' },
    RTM: { L: 'KHF', R: 'QPJ' },
    FFR: { L: 'KPV', R: 'XTP' },
    VLN: { L: 'PJQ', R: 'KTF' },
    JQX: { L: 'TNJ', R: 'DJG' },
    KTF: { L: 'PDG', R: 'KDF' },
    JVH: { L: 'LNC', R: 'PXL' },
    BPH: { L: 'NJC', R: 'DQG' },
    MFJ: { L: 'XHD', R: 'VFF' },
    CDC: { L: 'DLK', R: 'KMF' },
    MXN: { L: 'LSV', R: 'FCM' },
    LGT: { L: 'MPB', R: 'PNG' },
    XFT: { L: 'RCT', R: 'PPF' },
    BSJ: { L: 'DBK', R: 'LTT' },
    BVT: { L: 'JSP', R: 'QVG' },
    QBC: { L: 'XVJ', R: 'KDK' },
    VRD: { L: 'LFG', R: 'FHF' },
    KQT: { L: 'GVP', R: 'VGJ' },
    CSS: { L: 'NKM', R: 'KGQ' },
    HXL: { L: 'DTH', R: 'NCL' },
    FXJ: { L: 'DRB', R: 'JPR' },
    FFT: { L: 'JVT', R: 'SSC' },
    NJH: { L: 'NQK', R: 'BJM' },
    GHS: { L: 'CLL', R: 'NJH' },
    MMQ: { L: 'JQX', R: 'CSX' },
    PGD: { L: 'FKF', R: 'RGS' },
    PJQ: { L: 'KDF', R: 'PDG' },
    LFG: { L: 'KSB', R: 'CMM' },
    LRN: { L: 'BVF', R: 'KSQ' },
    GGX: { L: 'JSS', R: 'MTS' },
    LCC: { L: 'TDX', R: 'DLC' },
    HPP: { L: 'LTX', R: 'GHS' },
    CLL: { L: 'BJM', R: 'NQK' },
    TPQ: { L: 'XTC', R: 'TGP' },
    BQQ: { L: 'CHV', R: 'VVM' },
    PVJ: { L: 'LNT', R: 'VCJ' },
    QNQ: { L: 'QTV', R: 'CMH' },
    CVD: { L: 'XGF', R: 'NBH' },
    JVT: { L: 'MRN', R: 'JTG' },
    VFQ: { L: 'BXS', R: 'FCG' },
    CPM: { L: 'NTV', R: 'RSG' },
    QNF: { L: 'DLK', R: 'KMF' },
    GCA: { L: 'MGL', R: 'NNM' },
    MGX: { L: 'TFX', R: 'XNN' },
    MHR: { L: 'NJX', R: 'DNT' },
    KTM: { L: 'GDK', R: 'MQS' },
    KDR: { L: 'MPB', R: 'PNG' },
    NDF: { L: 'XXP', R: 'CJB' },
    ZZZ: { L: 'SKQ', R: 'JKJ' },
    MQL: { L: 'FBK', R: 'GRT' },
    NHV: { L: 'CKQ', R: 'XFD' },
    NBH: { L: 'PMR', R: 'LPL' },
    KCL: { L: 'FFB', R: 'TPF' },
    BJR: { L: 'FTB', R: 'KXR' },
    XSM: { L: 'QCL', R: 'MTK' },
    KBG: { L: 'QSG', R: 'LMK' },
    SKC: { L: 'NBQ', R: 'DKC' },
    PNG: { L: 'CNM', R: 'LQK' },
    HTB: { L: 'RMH', R: 'SNF' },
    RDM: { L: 'NJX', R: 'DNT' },
    FRM: { L: 'BXN', R: 'XBH' },
    XTC: { L: 'MNR', R: 'XCK' },
    JVX: { L: 'NLN', R: 'CCC' },
    GVQ: { L: 'CDM', R: 'HPX' },
    SCG: { L: 'JJD', R: 'DBR' },
    CCC: { L: 'CMR', R: 'NKL' },
    SNC: { L: 'KVK', R: 'QTC' },
    GJF: { L: 'BHB', R: 'GGT' },
    BJK: { L: 'JPS', R: 'BKQ' },
    PCC: { L: 'LRQ', R: 'MKS' },
    RBV: { L: 'PVJ', R: 'QST' },
    KMF: { L: 'BQQ', R: 'BXG' },
    KSQ: { L: 'HNT', R: 'CPM' },
    LPN: { L: 'CJB', R: 'XXP' },
    DLK: { L: 'BXG', R: 'BQQ' },
    MPB: { L: 'CNM', R: 'LQK' },
    VSH: { L: 'MVJ', R: 'GXS' },
    QBQ: { L: 'NBF', R: 'TQF' },
    XLG: { L: 'LNF', R: 'KCF' },
    LRQ: { L: 'QGF', R: 'JRV' },
    PVQ: { L: 'SGF', R: 'BBC' },
    DSS: { L: 'MJT', R: 'QML' },
    TLQ: { L: 'FRP', R: 'LDV' },
    DHC: { L: 'XFC', R: 'DSS' },
    FRD: { L: 'PNF', R: 'SFZ' },
    HGH: { L: 'STV', R: 'VDL' },
    FHL: { L: 'FNC', R: 'TJJ' },
    DHQ: { L: 'XGR', R: 'NMN' },
    BRJ: { L: 'BHR', R: 'GBT' },
    CQJ: { L: 'FHF', R: 'LFG' },
    KDK: { L: 'TTX', R: 'VLH' },
    QJP: { L: 'NQR', R: 'RJL' },
    GCM: { L: 'RXH', R: 'KHR' },
    TFM: { L: 'GGR', R: 'BVT' },
    NKL: { L: 'JHH', R: 'CKL' },
    PFQ: { L: 'LMK', R: 'QSG' },
    XXP: { L: 'RBV', R: 'QRP' },
    PJM: { L: 'TBP', R: 'HTB' },
    LDG: { L: 'GVQ', R: 'SMN' },
    GNS: { L: 'VVF', R: 'MFX' },
    TTH: { L: 'MRX', R: 'KNT' },
    JXL: { L: 'QJD', R: 'HKK' },
    QKG: { L: 'XHK', R: 'RNK' },
    RXD: { L: 'SRV', R: 'CXH' },
    SBS: { L: 'CTL', R: 'BGB' },
    CSC: { L: 'JFC', R: 'XSH' },
    SKQ: { L: 'RNQ', R: 'QVN' },
    QSS: { L: 'QCS', R: 'QFP' },
    JJF: { L: 'QQX', R: 'QQX' },
    KMB: { L: 'LFP', R: 'FFR' },
    LMD: { L: 'RXD', R: 'NDN' },
    SSQ: { L: 'HMP', R: 'BGK' },
    GKL: { L: 'PGQ', R: 'NHK' },
    DMH: { L: 'KKJ', R: 'MTX' },
    RBD: { L: 'SGH', R: 'PKL' },
    JBG: { L: 'RLB', R: 'RRL' },
    XPR: { L: 'PHH', R: 'MXL' },
    PCH: { L: 'TJF', R: 'RCH' },
    SRN: { L: 'BJK', R: 'LLT' },
    RGV: { L: 'NFQ', R: 'HMC' },
    MPV: { L: 'NFM', R: 'CJK' },
    RLB: { L: 'JDH', R: 'TMT' },
    XQK: { L: 'CSJ', R: 'FRT' },
    TTX: { L: 'VJP', R: 'NCG' },
    GPB: { L: 'KNT', R: 'MRX' },
    XKH: { L: 'GPB', R: 'TTH' },
    XJP: { L: 'FBK', R: 'GRT' },
    STF: { L: 'XKH', R: 'QHQ' },
    LCN: { L: 'JKJ', R: 'SKQ' },
    SBL: { L: 'MNV', R: 'QFH' },
    BQT: { L: 'QBB', R: 'NMX' },
    DBS: { L: 'CMC', R: 'KFX' },
    BVR: { L: 'BSJ', R: 'NBP' },
    STV: { L: 'XFX', R: 'QGQ' },
    CDM: { L: 'QFQ', R: 'MBF' },
    NRK: { L: 'RRL', R: 'RLB' },
    QDT: { L: 'MQN', R: 'CGX' },
    JBL: { L: 'BMR', R: 'JVJ' },
    DBK: { L: 'HHV', R: 'KTD' },
    JNM: { L: 'JVL', R: 'KPM' },
    MPK: { L: 'QXQ', R: 'RHK' },
    NRT: { L: 'NSH', R: 'GRC' },
    CMH: { L: 'HFN', R: 'FXJ' },
    KFV: { L: 'HHT', R: 'JSK' },
    XCZ: { L: 'GSR', R: 'CNK' },
    GSR: { L: 'QQK', R: 'DHQ' },
    PPF: { L: 'QKJ', R: 'DRK' },
    BGQ: { L: 'KRM', R: 'SVX' },
    QGF: { L: 'QBQ', R: 'HJF' },
    SFZ: { L: 'NNM', R: 'MGL' },
    XHD: { L: 'NFD', R: 'PSS' },
    FTB: { L: 'TFM', R: 'CXQ' },
    XSS: { L: 'KSQ', R: 'BVF' },
    SGH: { L: 'XVG', R: 'PVQ' },
    NKC: { L: 'GRC', R: 'NSH' },
    RBP: { L: 'PQP', R: 'CMP' },
    BRR: { L: 'JGB', R: 'GVH' },
    PDT: { L: 'RLP', R: 'DXM' },
    GLV: { L: 'JTN', R: 'FVN' },
    XKJ: { L: 'KPM', R: 'JVL' },
    MQN: { L: 'XLG', R: 'BVK' },
    MRN: { L: 'LVR', R: 'MPK' },
    LNF: { L: 'HCT', R: 'DBS' },
    TLT: { L: 'MCP', R: 'JBC' },
    QVG: { L: 'NKC', R: 'NRT' },
    VGJ: { L: 'KJF', R: 'SBS' },
    PDB: { L: 'GVP', R: 'VGJ' },
    FRT: { L: 'FHJ', R: 'GQS' },
    GXN: { L: 'XVL', R: 'PPZ' },
    QHQ: { L: 'GPB', R: 'TTH' },
    DQR: { L: 'RFF', R: 'MFM' },
    TTQ: { L: 'JNC', R: 'BKP' },
    JTK: { L: 'CCQ', R: 'MBJ' },
    SLC: { L: 'QDG', R: 'BSP' },
    TDT: { L: 'TSP', R: 'SKL' },
    VGQ: { L: 'CKR', R: 'KPF' },
    TJJ: { L: 'PGD', R: 'RNC' },
    CXQ: { L: 'GGR', R: 'BVT' },
    FNC: { L: 'PGD', R: 'RNC' },
    JFQ: { L: 'DTG', R: 'GJL' },
    NPM: { L: 'GGT', R: 'BHB' },
    FQD: { L: 'MCD', R: 'DSJ' },
    TQF: { L: 'QGS', R: 'VVK' },
    SVX: { L: 'TLC', R: 'DDL' },
    TDX: { L: 'BVV', R: 'NGL' },
    MSV: { L: 'NCL', R: 'DTH' },
    GQQ: { L: 'BVB', R: 'LGS' },
    LNC: { L: 'PCQ', R: 'RVK' },
    BSP: { L: 'NSB', R: 'CSF' },
    MNR: { L: 'XTX', R: 'TRT' },
    PDQ: { L: 'GJM', R: 'TDL' },
    MBF: { L: 'CFT', R: 'STF' },
    QJD: { L: 'RQP', R: 'VGD' },
    CNM: { L: 'BPQ', R: 'CGG' },
    XLS: { L: 'GSS', R: 'GPD' },
    TFX: { L: 'NPM', R: 'GJF' },
    DLC: { L: 'BVV', R: 'NGL' },
    BVK: { L: 'LNF', R: 'KCF' },
    VGD: { L: 'DFF', R: 'XPK' },
    RGS: { L: 'LPN', R: 'NDF' },
    JRP: { L: 'HHB', R: 'LTN' },
    GDD: { L: 'VST', R: 'SVR' },
    BDN: { L: 'RPD', R: 'QQF' },
    XTX: { L: 'VMH', R: 'KKV' },
    NMN: { L: 'NCH', R: 'GLV' },
    CMC: { L: 'VGF', R: 'HLG' },
    NBF: { L: 'VVK', R: 'QGS' },
    LCV: { L: 'TFX', R: 'XNN' },
    BBC: { L: 'CTP', R: 'KKQ' },
    THR: { L: 'DRC', R: 'KMB' },
    GNT: { L: 'MTX', R: 'KKJ' },
    DVQ: { L: 'RTM', R: 'VDX' },
    NFQ: { L: 'VVX', R: 'VCD' },
    CKQ: { L: 'HMV', R: 'XPR' },
    FCG: { L: 'VGQ', R: 'LDR' },
    KRM: { L: 'TLC', R: 'DDL' },
    LTX: { L: 'NJH', R: 'CLL' },
    VDQ: { L: 'JKS', R: 'GNS' },
    XSC: { L: 'LLT', R: 'BJK' },
    HQB: { L: 'GBP', R: 'RFP' },
    VDX: { L: 'KHF', R: 'QPJ' },
    RPC: { L: 'VFR', R: 'MFJ' },
    QTC: { L: 'FFT', R: 'NFG' },
    HLM: { L: 'BSP', R: 'QDG' },
    GGR: { L: 'QVG', R: 'JSP' },
    XCK: { L: 'XTX', R: 'TRT' },
    QFP: { L: 'KVD', R: 'XPB' },
    LMV: { L: 'CSJ', R: 'FRT' },
    SKL: { L: 'HXL', R: 'MSV' },
    TVP: { L: 'DJH', R: 'BKC' },
    QML: { L: 'QKH', R: 'SMT' },
    MNV: { L: 'KDR', R: 'LGT' },
    HRC: { L: 'SBG', R: 'JVH' },
    BJM: { L: 'KXG', R: 'DQR' },
    TND: { L: 'DTG', R: 'GJL' },
    JJN: { L: 'FQD', R: 'CRH' },
    LSV: { L: 'NRK', R: 'JBG' },
    GBT: { L: 'CLK', R: 'XVF' },
    BGK: { L: 'QRN', R: 'BDN' },
    BLV: { L: 'LJC', R: 'VLN' },
    KXR: { L: 'CXQ', R: 'TFM' },
    CMR: { L: 'JHH', R: 'CKL' },
    XFQ: { L: 'MQL', R: 'XJP' },
    MTX: { L: 'RPC', R: 'RRK' },
    NJC: { L: 'GQQ', R: 'CQK' },
    FVB: { L: 'FNC', R: 'TJJ' },
    FBX: { L: 'KXJ', R: 'TGM' },
    GPP: { L: 'XDC', R: 'CSC' },
    NRB: { L: 'JRQ', R: 'TLQ' },
    RRK: { L: 'VFR', R: 'MFJ' },
    TKS: { L: 'JJN', R: 'DMB' },
    GJH: { L: 'XSC', R: 'SRN' },
    CFJ: { L: 'CQJ', R: 'VRD' },
    MFX: { L: 'LCV', R: 'MGX' },
    XTR: { L: 'QFP', R: 'QCS' },
    QGQ: { L: 'DKT', R: 'XSM' },
    CFZ: { L: 'GRJ', R: 'KPD' },
    JGB: { L: 'HRC', R: 'LRR' },
    RDJ: { L: 'DKC', R: 'NBQ' },
    GRS: { L: 'XQG', R: 'DPN' },
    JPS: { L: 'XKJ', R: 'JNM' },
    JSS: { L: 'LJJ', R: 'TDT' },
    QPJ: { L: 'RDM', R: 'MHR' },
    DCN: { L: 'SMN', R: 'GVQ' },
    PKL: { L: 'XVG', R: 'PVQ' },
    SXA: { L: 'HCB', R: 'QKG' },
    LTN: { L: 'HJP', R: 'HMK' },
    LVR: { L: 'QXQ', R: 'RHK' },
    HFN: { L: 'JPR', R: 'DRB' },
    JDH: { L: 'HKC', R: 'GGX' },
    MRX: { L: 'SHB', R: 'JDB' },
    LFP: { L: 'KPV', R: 'XTP' },
    DKP: { L: 'KXR', R: 'FTB' },
    XPG: { L: 'QNF', R: 'CDC' },
    MRH: { L: 'LDX', R: 'HQB' },
    XFX: { L: 'DKT', R: 'DKT' },
    KKX: { L: 'HDB', R: 'DQH' },
    SVR: { L: 'KFP', R: 'FTT' },
    VCJ: { L: 'QMN', R: 'BVR' },
    LQH: { L: 'MKL', R: 'LCC' },
    MJT: { L: 'QKH', R: 'SMT' },
    QRP: { L: 'QST', R: 'PVJ' },
    TMP: { L: 'MCP', R: 'JBC' },
    HLG: { L: 'PFS', R: 'VVQ' },
    LLV: { L: 'CMH', R: 'QTV' },
    QBB: { L: 'BLM', R: 'FTM' },
    CTV: { L: 'HTM', R: 'XFT' },
    DNT: { L: 'KFG', R: 'BRR' },
    XHK: { L: 'BRJ', R: 'QCB' },
    CJK: { L: 'CTD', R: 'CVD' },
    AAA: { L: 'JKJ', R: 'SKQ' },
    BXX: { L: 'GNT', R: 'DMH' },
    HCB: { L: 'RNK', R: 'XHK' },
    LNT: { L: 'QMN', R: 'BVR' },
    TGM: { L: 'NXP', R: 'JHN' },
    CQK: { L: 'LGS', R: 'BVB' },
    CJB: { L: 'RBV', R: 'QRP' },
    HDB: { L: 'NCV', R: 'LQR' },
    CNQ: { L: 'CTV', R: 'MQB' },
    BHN: { L: 'GDK', R: 'GDK' },
    DML: { L: 'JJF', R: 'DGK' },
    FVF: { L: 'KRH', R: 'BMQ' },
    TSP: { L: 'MSV', R: 'HXL' },
    QBG: { L: 'VLR', R: 'QJP' },
    KNT: { L: 'JDB', R: 'SHB' },
    FCS: { L: 'TGM', R: 'KXJ' },
    FVN: { L: 'JFQ', R: 'TND' },
    DHV: { L: 'FCG', R: 'BXS' },
    XPK: { L: 'VHV', R: 'THR' },
    BKP: { L: 'VDQ', R: 'HPT' },
    VST: { L: 'FTT', R: 'KFP' },
    DLS: { L: 'VVL', R: 'SXD' },
    FTR: { L: 'MBJ', R: 'CCQ' },
    MXL: { L: 'CRM', R: 'VQB' },
    DHP: { L: 'DHC', R: 'PQQ' },
    BXS: { L: 'LDR', R: 'VGQ' },
    DQL: { L: 'HDB', R: 'DQH' },
    TMT: { L: 'GGX', R: 'HKC' },
    PFC: { L: 'CJF', R: 'CFZ' },
    CTD: { L: 'XGF', R: 'NBH' },
    VFR: { L: 'VFF', R: 'XHD' },
    RQP: { L: 'DFF', R: 'XPK' },
    LTK: { L: 'NFM', R: 'CJK' },
    MTS: { L: 'LJJ', R: 'TDT' },
    HHT: { L: 'FVF', R: 'VLM' },
    MNC: { L: 'QBB', R: 'NMX' },
    FKF: { L: 'LPN', R: 'NDF' },
    LHD: { L: 'QJD', R: 'HKK' },
    JFC: { L: 'MJV', R: 'MJV' },
    XXX: { L: 'LMD', R: 'LGH' },
    NCV: { L: 'HFF', R: 'FHP' },
    PSS: { L: 'BQP', R: 'NJF' },
    NQH: { L: 'XLS', R: 'FQG' },
    VGF: { L: 'VVQ', R: 'PFS' },
    SKV: { L: 'MNV', R: 'QFH' },
    LJC: { L: 'KTF', R: 'PJQ' },
    SNX: { L: 'XDC', R: 'CSC' },
    NDN: { L: 'CXH', R: 'SRV' },
    HKC: { L: 'MTS', R: 'JSS' },
    PHH: { L: 'CRM', R: 'VQB' },
    FLN: { L: 'GJM', R: 'TDL' },
    VVK: { L: 'PHD', R: 'GKL' },
    MQS: { L: 'RKN', R: 'PFC' },
    LRR: { L: 'JVH', R: 'SBG' },
    JKJ: { L: 'RNQ', R: 'QVN' },
    XVL: { L: 'HCB', R: 'QKG' },
    NPD: { L: 'SNX', R: 'GPP' },
    KTD: { L: 'QDJ', R: 'KHK' },
    TDL: { L: 'RGV', R: 'GLB' },
    SNF: { L: 'HLJ', R: 'XXX' },
    MBJ: { L: 'JMK', R: 'BDB' },
    GDK: { L: 'RKN', R: 'RKN' },
    SFV: { L: 'DLS', R: 'PLR' },
    KNF: { L: 'BGK', R: 'HMP' },
    XVF: { L: 'QXB', R: 'BGQ' },
    RMH: { L: 'HLJ', R: 'XXX' },
    LPF: { L: 'XVP', R: 'NHB' },
    NSH: { L: 'KQJ', R: 'MBT' },
    QNM: { L: 'GXV', R: 'FRM' },
    LTM: { L: 'BKL', R: 'SKR' },
    GJL: { L: 'TCX', R: 'LVM' },
    KXG: { L: 'RFF', R: 'MFM' },
    TFG: { L: 'DHV', R: 'VFQ' },
    HPX: { L: 'MBF', R: 'QFQ' },
    GJM: { L: 'GLB', R: 'RGV' },
    VCD: { L: 'TVH', R: 'GCM' },
    NLN: { L: 'NKL', R: 'CMR' },
    XPB: { L: 'TVP', R: 'QRT' },
    FRJ: { L: 'XTC', R: 'TGP' },
    FHF: { L: 'KSB', R: 'CMM' },
    KVK: { L: 'FFT', R: 'NFG' },
    GRC: { L: 'MBT', R: 'KQJ' },
    BHR: { L: 'XVF', R: 'CLK' },
    HLJ: { L: 'LMD', R: 'LGH' },
    LLT: { L: 'JPS', R: 'BKQ' },
    DKC: { L: 'BPL', R: 'HGH' },
    BPL: { L: 'STV', R: 'VDL' },
    SHB: { L: 'FBX', R: 'FCS' },
    FQG: { L: 'GPD', R: 'GSS' },
    TLN: { L: 'RCQ', R: 'RBP' },
    LDR: { L: 'CKR', R: 'KPF' },
    NCH: { L: 'JTN', R: 'FVN' },
    CMM: { L: 'BPH', R: 'MXS' },
    RLP: { L: 'LPF', R: 'LSS' },
    CKR: { L: 'SHL', R: 'NQH' },
    TJF: { L: 'FDT', R: 'CCB' },
    BVD: { L: 'DLS', R: 'PLR' },
    QQK: { L: 'XGR', R: 'NMN' },
    KPV: { L: 'QBC', R: 'LLD' },
    HFF: { L: 'NNH', R: 'CSS' },
    DKG: { L: 'PQQ', R: 'DHC' },
    TQZ: { L: 'DMB', R: 'JJN' },
    MLC: { L: 'VNN', R: 'XPG' },
    DHX: { L: 'PDB', R: 'KQT' },
    BHB: { L: 'XHP', R: 'BGG' },
    RHK: { L: 'QDT', R: 'JLV' },
    PDG: { L: 'PJM', R: 'TDD' },
    FHJ: { L: 'CFJ', R: 'GVR' },
    DJG: { L: 'KSD', R: 'DHX' },
    RFF: { L: 'MXN', R: 'PMM' },
    MQB: { L: 'HTM', R: 'XFT' },
    NSB: { L: 'BTC', R: 'MLD' },
    DDL: { L: 'FRJ', R: 'TPQ' },
    XDB: { L: 'VDX', R: 'RTM' },
    NJX: { L: 'KFG', R: 'BRR' },
    JHH: { L: 'MVX', R: 'MCB' },
    DFF: { L: 'THR', R: 'VHV' },
    GMA: { L: 'JJN', R: 'DMB' },
    SHP: { L: 'BKL', R: 'SKR' },
    QXB: { L: 'KRM', R: 'SVX' },
}

let steps = main('AAA');
console.log("Part 1: " + steps)
steps = mainForGhosts()
console.log("Part 2: " + steps)
